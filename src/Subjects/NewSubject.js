import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewSubject = () => {
  const [subject, setSubject] = useState({
    name: "",
    fondCasova: 0,
    razred: 1,
  });
  const [save, setSave] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const u = JSON.parse(user);
          setIsLoading(true);

          let response = await fetch("http://localhost:8080/api/v1/predmet", {
            headers: {
              Authorization: `Bearer ${u.token}`,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            let subjects = await response.json();
            setSubjects(subjects);
          } else {
            setErrorMessage("Something went wrong.");
          }
        } else {
          setErrorMessage("User not found.");
        }
      } catch (error) {
        setErrorMessage("Error: " + error.message);
      }

      setIsLoading(false);
    };

    getSubjects();
  }, []);

  const uniqueRazreds = Array.from(new Set(subjects.map((subject) => subject.razred))).sort((a, b) => {
    const sortOrder = ["prvi", "drugi", "treci", "cetvrti", "peti", "sesti", "sedmi", "osmi"];
    const indexA = sortOrder.indexOf(a.toLowerCase());
    const indexB = sortOrder.indexOf(b.toLowerCase());
    return indexA - indexB;
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSubject({
      ...subject,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setSave(true);

    const user = localStorage.getItem("user");
    if (user) {
      const u = JSON.parse(user);
      fetch("http://localhost:8080/api/v1/predmet/novipredmet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${u.token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(subject),
      })
        .then((response) => {
          setSave(false);

          if (response.ok) {
            setIsSuccess(true);
            setErrorMessage("");
            setTimeout(() => {
              navigate("/ShowSubjects");
            }, 1000);
          } else {
            setIsSuccess(false);
            setErrorMessage("Failed to update the data.");
          }
        })
        .catch((error) => {
          setSave(false);
          setIsSuccess(false);
          setErrorMessage("An error occurred while processing the request.");
        });
    } else {
      setErrorMessage("User not found.");
    }
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          "flex-direction": "column",
          "align-items": "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4"> Add a new Subject </Typography>
        {isSuccess && <Alert severity="success">New subject added.</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField
          label="Subject name"
          variant="standard"
          name="name"
          value={subject.name}
          onChange={handleInputChange}
        ></TextField>
        <TextField
          label="Fond Casova"
          variant="standard"
          name="fondCasova"
          value={subject.fondCasova}
          onChange={handleInputChange}
        ></TextField>

        <FormControl fullWidth value={subject.razred}>
          <InputLabel id="razred" name="razred">
            Razred
          </InputLabel>
          <Select id="razred" label="razred" value={subject.razred} name="razred" onChange={handleInputChange}>
            {uniqueRazreds.map((razred) => (
              <MenuItem key={razred} value={razred}>
                {razred}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} variant="contained" disabled={save}>
          {save ? "Submitting..." : "Submit"}
        </Button>

        {isLoading && <Alert severity="error">Loading subjects...</Alert>}
      </Box>
    </Container>
  );
};

export default NewSubject;
