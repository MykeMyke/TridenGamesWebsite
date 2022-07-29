import "../styles/Global.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;

const Header = () => {
  return (
    <Box sx={{ justifyContent: "space-between" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            container
            direction="row"
            spacing={1.8}
            textAlign="center"
            alignItems="center"
            sx={{ mb: 0.6 }}
          >
            <Grid item>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "red" : "White",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    textDecoration: "none",
                  };
                }}
                to="/"
                activeClassName="is-active"
              >
                About <br></br>Triden
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "red" : "White",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    textDecoration: "none",
                  };
                }}
                to="/calendar"
                activeClassName="is-active"
              >
                Games <br></br>Calendar
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "red" : "White",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    textDecoration: "none",
                  };
                }}
                to="/team"
                activeClassName="is-active"
              >
                Meet The <br></br>Team
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "red" : "White",
                    fontSize: "0.85rem",
                    fontWeight: 400,
                    textDecoration: "none",
                  };
                }}
                to="/benefits"
                activeClassName="is-active"
              >
                Member <br></br>Benefits
              </NavLink>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            href="https://discord.gg/JDB6BYTK9T"
            target="_blank"
            rel="noreferrer"
            color="accent"
            sx={{
              width: "85px",
              py: 0.5,
              px: 0,
              lineHeight: "1.2",
              my: 1.5,
              textAlign: "center",
              fontSize: "0.75rem",
            }}
            className="HeaderButton"
          >
            Join our Discord
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
