import "./Global.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Grid } from "@mui/material";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;
/* NEED TO APPLY GLOBAL STYLING FIRST THEN MOVE */
const Header = () => {
  return (
    <Box sx={{ justifyContent: "space-between" }}>
      <AppBar position="fixed">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box textAlign="left" sx={{ flexGrow: 1 }}>
            <Typography variant="h5">Upcoming Games</Typography>
          </Box>
          <Button
            variant="contained"
            href="https://triden.digitaldemiplane.com/invisibleservant/admin/core/game/add/"
            target="_blank"
            alignSelf="center"
            textAlign="center"
            color="accent"
            sx={{ height: "50px", my: 1.5, mr: 1 }}
            className="HeaderButton"
          >
            <Box sx={{ mr: 1.5 }}>
              <AddBoxIcon fontSize="large" sx={{ pb: 0 }} />
            </Box>
            Create a Game
          </Button>
          <Button
            variant="contained"
            href="https://discord.gg/tridengames"
            target="_blank"
            color="accent"
            sx={{ height: "50px", my: 1.5 }}
            className="HeaderButton"
          >
            <Box sx={{ mr: 1.5 }}>
              <FontAwesomeIcon icon={brands("discord")} size="2x" />
            </Box>
            Join Triden
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
