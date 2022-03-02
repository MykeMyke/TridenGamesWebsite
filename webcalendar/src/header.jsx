import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";
import { Grid } from "@mui/material";
import { now } from "./currentTime";

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
          {/* PUT A MENU HERE? */}
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Box
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="body" textAlign="center" alignself="center">
              Loaded at:
            </Typography>
            <Typography variant="body2" textAlign="center" alignself="center">
              {/* {now} */}
            </Typography>
          </Box>

          <Typography
            variant="h6"
            component="div"
            alignSelf="center"
            textAlign="center"
            sx={{ flexGrow: 1 }}
          >
            Triden Upcoming Games
          </Typography>
          {/* DISCORD ICON NOT WORKING */}
          {/* <FontAwesomeIcon icon="fa-discord" /> */}
          <Button
            variant="contained"
            href="https://discord.gg/JDB6BYTK9T"
            target="_blank"
          >
            <Box sx={{ mr: 1.5 }}>
              <FontAwesomeIcon icon={brands("discord")} size="2x" />
            </Box>
            <strong>Join Triden</strong>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
