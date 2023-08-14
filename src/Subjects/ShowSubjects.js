import React, { useEffect, useState } from "react";
import "./Subjects.css";
import { styled, alpha } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ShowSubjects = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState([]);
  const [all, setAll] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFetchingSubjects, setIsFetchingSubjects] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleDeleteSubject = async (subjectId) => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        const response = await fetch(`http://localhost:8080/api/v1/predmet/obrisipredmet/${subjectId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${u.token}`,
            Accept: "application/json",
          },
        });
        if (response.status === 200) {
          setIsSuccess(true);
          window.scrollTo(0, 0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (search !== "") {
      let filteredSubjects = all.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));
      setSubject(filteredSubjects);
    } else {
      setSubject(all);
    }
  }, [search, all]);

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const u = JSON.parse(user);
          let response = await fetch("http://localhost:8080/api/v1/predmet", {
            headers: {
              Authorization: u.token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            let subjects = await response.json();
            setSubject(subjects);
            setAll(subjects);
          } else {
            setError("Something went wrong.");
          }
        } else {
          setError("User not found.");
        }
      } catch (error) {
        setError("Error: " + error.message);
      }

      setIsLoading(false);
      setIsFetchingSubjects(false);
    };

    if (isFetchingSubjects) {
      getSubjects();
    }
  }, [isFetchingSubjects]);

  if (isLoading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {isSuccess && (
        <Alert severity="success" sx={{ width: "250px", position: "absolute", opacity: "0.7" }}>
          Deleted subject successfully.
        </Alert>
      )}
      <AppNavbar />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={() => navigate("new_subject")}>
          Add new subject
        </Button>
      </Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>
      <Grid container spacing={3}>
        {subject.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {p.razred}
                </Typography>
                <Typography variant="h5" component="div">
                  {p.name}
                </Typography>
                <Typography variant="body2">Osnovne informacije o predmetu.</Typography>
              </CardContent>
              <CardActions>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit" onClick={() => navigate(`edit_subject/${p.id}`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Info">
                  <IconButton aria-label="info" onClick={() => navigate(`show_one_subject/${p.id}`)}>
                    <InfoIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" onClick={() => p.id !== undefined && handleDeleteSubject(p.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShowSubjects;
