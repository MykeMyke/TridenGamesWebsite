import "../styles/Global.css";
import React from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Divider } from "@mui/material";
import OnLoadPopUp from "../components/OnLoadPopUp";

function ForWho({ title, content, imageUrl, imageAlt = "Triden Games" }) {
  return (
    <div alignItems="center" className="forWho">
      <div className="title">
        <Typography
          variant="h3"
          color="text.primary"
          sx={{ mb: 1, textAlign: "center" }}
        >
          {title}
        </Typography>
      </div>
      <div className="sidebar">
        <img src={imageUrl} alt={imageAlt} className="Art" />
      </div>
      <div className="content">
        <Typography variant="subtitle1" color="text.primary" sx={{ mb: 4 }}>
          {content}
        </Typography>
      </div>
    </div>
  );
}

function Home() {
  return (
    <React.Fragment>
      <OnLoadPopUp />
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
          <img src="/img/Banner2.png" alt="Triden Games" className="MainBanner" />
        </Grid>
        <Grid item>
          <Divider
            variant="middle"
            sx={{
              my: 0.6,
            }}
          />
          <Typography variant="h5" color="text.primary" sx={{ mt: 2, mb: 2 }}>
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
          <ForWho
            title="For Players"
            imageUrl="/img/DeanSpencer-spotcol-signalfire.png"
            content={
              <>
                We run 30+ Adventurer's League games every month, with a
                schedule of games from our Resident DMs released in advance
                every month. Check out{" "}
                <strong>
                  <a href="/calendar">our calendar of games</a>
                </strong>
                . There are also a number of campaigns being run at any time,
                and special events like Epics being run several times a year.
              </>
            }
          />
          <ForWho
            title="For DMs"
            imageUrl="/img/DeanSpencer-spotcol-magicbook.png"
            content={
              <>
                We have an extensive library of adventure modules (150+), as
                well as maps, art and music to help you level up your production
                value. We also have custom toolsets and our own bot to make
                running games as easy as possible.{" "}
                <strong>More fun, less faff!</strong>
              </>
            }
          />
          <ForWho
            title="For Creatives"
            imageUrl="/img/DeanSpencer-spotcol-vargtank.png"
            content={
              <>
                {" "}
                Our staff and experienced members of the community support the
                various interests of the community on a day-to-day basis -
                whether you like to make maps, write adventures or produce art;
                we offer support and projects to get involved in! This includes
                significant support for{" "}
                <strong>
                  <a href="/tridenverse">Adventure Writers!</a>
                </strong>
              </>
            }
          />
          <ForWho
            title="For You"
            imageUrl="/img/DeanSpencer-spotcol-elfenchanter.png"
            content={
              <>
                We have an{" "}
                <strong>
                  <a href="/team">amazing staff</a>
                </strong>{" "}
                that help provide the best experience possible. We also offer{" "}
                <strong>
                  <a href="/benefits">awesome benefits</a>
                </strong>{" "}
                for those who help us not only continue but grow - thank you to
                all our Patreon members, and everybody in the community that
                volunteer their time and talent.
              </>
            }
          />
          <Divider
            variant="middle"
            sx={{
              mt: 6,
            }}
          />
          <Typography
            variant="subtitle2"
            color="text.primary"
            sx={{ my: 2, textAlign: "center" }}
          >
            We believe in creating a safe and enjoyable space for everyone, and
            have a number of{" "}
            <strong>
              <a href="/policies" target="_blank" rel="noreferrer">
                policies
              </a>
            </strong>{" "}
            to make that happen.
          </Typography>
          <Divider
            variant="middle"
            sx={{
              my: 0.6,
            }}
          />
          <Typography
            color="text.secondary"
            sx={{ mt: 3, fontSize: "0.72rem", textAlign: "center" }}
          >
            Stock artwork © Dean Spencer, used with permission. All rights
            reserved.
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Home;
