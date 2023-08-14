import { Alert, Box, Button, Container, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const NewProfessor = () => {
  const [nastavnik, setNastavnik] = useState({
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

  const [showPassword, setShowPassword] = useState(false);

  const handlePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNastavnik({
      ...nastavnik,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    setSave(true);

    try {
      event.preventDefault();
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let response = await fetch("http://localhost:8080/api/v1/korisnik/newUser", {
          method: "POST",
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
          setErrorMessage("Failed to add Nastavnik.");
        }
      } else {
        setIsSuccess(false);
        setErrorMessage("User not found.");
      }
    } catch (error) {
      setIsSuccess(false);
      setErrorMessage("Failed to add Nastavnik. Please try again later.");
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
        <Typography variant="h4">Add a new Nastavnik</Typography>
        {isSuccess && <Alert severity="success">New Nastavnik added.</Alert>}
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <form>
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
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Password"
            variant="outlined"
            name="password"
            value={nastavnik.password}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePassVisibility} aria-label="toggle password" edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            name="confirmedPassword"
            value={nastavnik.confirmedPassword}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePassVisibility} aria-label="toggle password" edge="end">
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Email"
            variant="standard"
            name="email"
            value={nastavnik.email}
            onChange={handleInputChange}
          />

          <Button onClick={handleSubmit} variant="contained" disabled={save}>
            {save ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default NewProfessor;
