import "../styles/Global.css";
import React from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import MainBanner from "../img/Banner2.png";
import { Divider } from "@mui/material";

function Home() {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ px: 2, mb: 2 }}
      >
        <Grid item>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Welcome to <strong>Triden Games!</strong>
          </Typography>
        </Grid>
        <Grid item>
          <img src={MainBanner} alt="Triden Games" className="MainBanner" />
        </Grid>
        <Grid item>
          <Divider
            variant="middle"
            sx={{
              my: 0.6,
            }}
          />
          <Typography
            variant="subtitle1"
            color="text.primary"
            sx={{ mt: 2, mb: 3 }}
          >
            We are a community server for D&D 5e, organised on{" "}
            <strong>
              <a
                href="https://discord.gg/tridengames"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>
            </strong>
            . We support players, DMs, cartographers, authors and any other way
            people can think of to enjoy this hobby of ours!
          </Typography>
          <Typography variant="subtitle1" color="text.primary" sx={{ mb: 3 }}>
            We run 30+ Adventurer's League games every month, with a schedule of
            games from our Resident DMs released in advance every month. Check
            out{" "}
            <strong>
              <a href="/calendar">our calendar of games</a>
            </strong>
            . There are also a number of campaigns being run at any time, and
            special events like Epics being run several times a year.
          </Typography>
          <Typography variant="subtitle1" color="text.primary" sx={{ mb: 3 }}>
            We have an{" "}
            <strong>
              <a href="/team">amazing staff</a>
            </strong>{" "}
            that take care of their own areas on a day-to-day basis.
          </Typography>
          <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
            We offer{" "}
            <strong>
              <a href="/benefits">awesome benefits</a>
            </strong>{" "}
            for those who help us not only continue but grow - thank you to all
            our Patreon members, and everybody in the community that volunteer
            their time and talent.
          </Typography>
          <Divider
            variant="middle"
            sx={{
              my: 0.6,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
