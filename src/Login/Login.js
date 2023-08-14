import { Button, Container, Grid, IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/v1/login?username=${username}&password=${password}`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        onLogin();
      } else {
        console.log("Error during login");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2} direction="column" justifyContent="center" style={{ minHeight: "100vh" }}>
        <Grid item xs={8}>
          <form>
            <Paper elevation={2} sx={{ padding: 5 }}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    type="text"
                    fullWidth
                    label="Enter your username"
                    placeholder="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    label="Enter your password"
                    placeholder="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit" fullWidth onClick={login}>
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
