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
            sx={{ mt: 2, mb: 4 }}
          >
            We are a community server for D&D 5e, organised on{" "}
            <strong>
              <a
                href="https://discord.gg/JDB6BYTK9T"
                target="_blank"
                rel="noreferrer"
              >
                Discord
              </a>
            </strong>
            . We support players, DMs, cartographers, authors and any other way
            people can think of to enjoy this hobby of ours!
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ mb: 1, textAlign: "center" }}
          >
            For Players
          </Typography>
          <Typography variant="subtitle1" color="text.primary" sx={{ mb: 4 }}>
            We run 30+ Adventurer's League games every month, with a schedule of
            games from our Resident DMs released in advance every month. Check
            out{" "}
            <strong>
              <a href="/calendar">our calendar of games</a>
            </strong>
            . There are also a number of campaigns being run at any time, and
            special events like Epics being run several times a year.
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ mb: 1, textAlign: "center" }}
          >
            For DMs
          </Typography>
          <Typography variant="subtitle1" color="text.primary" sx={{ mb: 4 }}>
            We have an extensive library of adventure modules (150+), as well as
            maps, art and music to help you level up your production value. We
            also have custom toolsets and our own bot to make running games as
            easy as possible. <strong>More fun, less faff!</strong>
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ mb: 1, textAlign: "center" }}
          >
            For Creatives
          </Typography>
          <Typography variant="subtitle1" color="text.primary" sx={{ mb: 4 }}>
            Our staff and experienced members of the community support the
            various interests of the community on a day-to-day basis - whether
            you like to make maps, write adventures or produce art; there is
            support and projects to get involved in!
          </Typography>
          <Typography
            variant="h4"
            color="text.primary"
            sx={{ mb: 1, textAlign: "center" }}
          >
            For You!
          </Typography>
          <Typography variant="subtitle1" color="text.primary" sx={{ mb: 2 }}>
            We have an{" "}
            <strong>
              <a href="/team">amazing staff</a>
            </strong>{" "}
            that help provide the best experience possible. We also offer{" "}
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
