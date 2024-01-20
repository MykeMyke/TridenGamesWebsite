import * as React from "react";
import { NavLink } from "react-router-dom";

import { AppBar, Box, Toolbar, Grid, Button } from "@mui/material";

import "../styles/Global.css";
import AuthButton from "./authentication/AuthButton";
import JoinDiscordButton from "./authentication/JoinDiscordButton";

<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
/>;

const Header = () => {
  return (
    <Box sx={{ justifyContent: "space-between", color: "red" }}>
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
                    fontWeight: 500,
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
                    fontWeight: 500,
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
                    fontWeight: 500,
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
                    fontWeight: 500,
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: 1.8,
              alignItems: "center",
            }}
          >
            <JoinDiscordButton/>
            <AuthButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
