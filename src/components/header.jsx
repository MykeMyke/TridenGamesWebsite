import * as React from "react";
import { NavLink } from "react-router-dom";

import { AppBar, Box, Toolbar, Grid, Button } from "@mui/material";

import "../styles/Global.css";
import AuthButton from "./authentication/AuthButton";

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
                activeclassname="is-active"
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
                activeclassname="is-active"
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
                activeclassname="is-active"
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
                activeclassname="is-active"
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
            <AuthButton />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
