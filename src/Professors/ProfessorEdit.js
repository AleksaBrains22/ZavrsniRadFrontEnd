import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProfessorEdit = () => {
  const { id } = useParams();
  const [nastavnik, setNastavnik] = useState({
    id: parseInt(id),
    ime: "",
    prezime: "",
    username: "",
    password: "",
    confirmedPassword: "",
    email: "",
    uloga: "NASTAVNIK",
  });
  const [save, setSave] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNastavnik({
      ...nastavnik,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSave(true);

    try {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let response = await fetch(`http://localhost:8080/api/v1/korisnik/updejtovanKorisnik/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${u.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nastavnik),
        });

        if (response.ok) {
          setIsSuccess(true);
          setErrorMessage("");
          navigate("/ShowProfessors");
        } else {
          setIsSuccess(false);
          setErrorMessage("Failed to edit Professor.");
        }
      } else {
        setIsSuccess(false);
        setErrorMessage("User not found.");
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage("Failed to edit Professor. Please try again later.");
    }

    setSave(false);
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4">Edit the Professor</Typography>
        {isSuccess && <Alert severity="success">Edited Professor.</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

        <TextField label="Ime" variant="standard" name="ime" value={nastavnik.ime} onChange={handleInputChange} />
        <TextField
          label="Prezime"
          variant="standard"
          name="prezime"
          value={nastavnik.prezime}
          onChange={handleInputChange}
        />
        <TextField
          label="Username"
          variant="standard"
          name="username"
          value={nastavnik.username}
          onChange={handleInputChange}
        />
        <TextField
          label="Password"
          variant="standard"
          name="password"
          value={nastavnik.password}
          onChange={handleInputChange}
        />
        <TextField
          label="Confirm Password"
          variant="standard"
          name="confirmedPassword"
          value={nastavnik.confirmedPassword}
          onChange={handleInputChange}
        />
        <TextField label="Email" variant="standard" name="email" value={nastavnik.email} onChange={handleInputChange} />

        <Button onClick={handleSubmit} variant="contained" fullWidth disabled={save}>
          {save ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default ProfessorEdit;
