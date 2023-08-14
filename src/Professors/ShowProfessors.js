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
import CardMedia from "@mui/material/CardMedia";
import { styled, alpha } from "@mui/material/styles";

import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavbar from "../AppNavbar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

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

const ShowPressors = () => {
  const [professor, setProfessor] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingProfessors, setIsFetchingProfessors] = useState(true);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const [all, setAll] = useState([]);
  const navigate = useNavigate();

  const handleDeleteProfessor = async (professorId) => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        const response = await fetch(`http://localhost:8080/api/v1/korisnik/obrisiKorisnika/${professorId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${u.token}`,
            Accept: "application/json",
          },
        });
        if (response.status === 202) {
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
      let filteredProfessors = all.filter((p) => {
        const fullName = `${p.ime} ${p.prezime}`.toLowerCase();
        const searchTerm = search.toLowerCase();

        return fullName.includes(searchTerm);
      });
      setProfessor(filteredProfessors);
    } else {
      setProfessor(all);
    }
  }, [search, all]);

  useEffect(() => {
    const getProfessors = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const u = JSON.parse(user);
          let response = await fetch("http://localhost:8080/api/v1/nastavnik", {
            headers: {
              Authorization: u.token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            let professor = await response.json();
            setProfessor(professor);
            setAll(professor);
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
      setIsFetchingProfessors(false);
    };

    if (isFetchingProfessors) {
      getProfessors();
    }
  }, [isFetchingProfessors]);

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
          Deleted professor successfuly.
        </Alert>
      )}
      <Box sx={{ marginBottom: 3 }}>
        <AppNavbar />
        <Box sx={{ display: "flex", justifyContent: "flex-end", marginBottom: 3 }}>
          <Button variant="outlined" onClick={() => navigate("new_professor")}>
            Add new professor
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Grid container spacing={3}>
            {professor.map((p) => (
              <Grid item xs={12} sm={6} md={4} key={p.id}>
                <Card>
                  <CardMedia
                    sx={{ height: 222 }}
                    image="https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?cs=srgb&dl=pexels-rdne-stock-project-7092613.jpg&fm=jpg"
                    title="Professors"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" key={p.id}>
                      {p.ime} {p.prezime}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua. Mi proin sed libero enim sed faucibus turpis in. Vestibulum morbi
                      blandit cursus risus at. Odio ut enim blandit volutpat maecenas volutpat blandit.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title="Edit">
                      <IconButton aria-label="edit" onClick={() => navigate(`update_professors/${p.id}`)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Info">
                      <IconButton aria-label="info" onClick={() => navigate(`infoProfessor/${p.id}`)}>
                        <InfoIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton aria-label="delete" onClick={() => p.id !== undefined && handleDeleteProfessor(p.id)}>
                        {" "}
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ShowPressors;
