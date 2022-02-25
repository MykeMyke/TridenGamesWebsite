import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import DiscordIcon from "@mui/icons-material/Discord";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fadiscord } from "@fortawesome/free-solid-svg-icons";
import FlagIcon from "@mui/icons-material/Flag";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;
/* NEED TO APPLY GLOBAL STYLING FIRST THEN MOVE */
const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
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
          <Typography
            variant="h6"
            component="div"
            alignSelf="center"
            textAlign="center"
            sx={{ flexGrow: 1 }}
          >
            Triden Upcoming Games
          </Typography>
          /* DISCORD ICON NOT WORKING */
          {/* <FontAwesomeIcon icon="fa-discord" /> */}
          <Button
            variant="contained"
            startIcon={<FlagIcon />}
            href="https://discord.gg/JDB6BYTK9T"
            target="_blank"
          >
            Join Triden on Discord
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
