import { Box, Button, CardMedia, Divider, Drawer, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ThemeProvider, styled, useTheme, createTheme } from "@mui/material/styles";
import AppNavbar from "../AppNavbar";

const HomePage = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();
  const handlerDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const Handlelogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
    window.location.reload(false);
  };

  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <AppNavbar />
      <CardMedia
        sx={{ height: "93vh" }}
        image="https://www.verywellfamily.com/thmb/mi5BR5mruiShD9HnmFwoIu241E4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/high-school-teacher-calling-on-student-in-classroom-595349163-5adf35e6fa6bcc0036b16732.jpg"
      />
    </Box>
  );
};

export default HomePage;
