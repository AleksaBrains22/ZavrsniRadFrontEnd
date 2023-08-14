import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Box, Drawer, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AppNavbar = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const theme = useTheme();

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
    window.location.reload(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static" open={openDrawer}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ...(openDrawer && { display: "none" }) }}
            onClick={handleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <img
            src="https://png.pngtree.com/png-vector/20211011/ourmid/pngtree-school-logo-png-image_3977360.png"
            alt="Logo"
            style={{ height: "34px" }}
            onClick={() => navigate("/home")}
          />
          <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
            School
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        {/* Drawer content goes here */}
        <MenuItem onClick={() => navigate("/ShowSubjects")}>Subjects</MenuItem>
        <MenuItem onClick={() => navigate("/ShowProfessors")}>Professors</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Drawer>
    </Box>
  );
};

export default AppNavbar;
