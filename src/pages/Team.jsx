import React from "react";
import { Grid, Typography } from "@mui/material";
import Staff from "../img/20220726_Triden Roles and Responsibilities.jpg";
import "../styles/Global.css";
import ResDmBio from "../components/resDMbioCard";
import { resDMbios } from "../data/resDMbios";
import Divider from "@mui/material/Divider";
import ResDMlogo from "../img/Resident-DMs.png";
import Stack from "@mui/material/Stack";

function Team() {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        direction="column"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ px: 2, my: 2 }}
      >
        <Grid item>
          <img src={Staff} alt="Triden Games Staff" className="MainBanner" />
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ my: 3 }} />
      <Stack spacing={1}>
        <div className="centraliser">
          <div></div>
          <div>
            <img
              src={ResDMlogo}
              alt="Triden Games Resident DMs"
              className="header-art"
            />
          </div>
          <div></div>
        </div>
        <Typography
          variant="body"
          color="text.primary"
          sx={{ px: 3, maxWidth: "1080px", alignSelf: "center" }}
        >
          The Resident DMs are a dedicated group from all around the world who
          each month run a pre-released schedule of Adventurer's League games.
          These games are run in all timezones and feature some of the best
          production value, toolsets and streamlining around.
        </Typography>
        <div className="centraliser">
          <div></div>
          <div className="map">
            <iframe
              title="team-map"
              frameborder="0"
              src="https://www.google.com/maps/d/u/0/embed?mid=1rbWNqRKfRhxPgqz_X5VFFTSdJDnrBeE&ehbc=2E312F&zoom=2"
              width="1080"
              height="480"
            ></iframe>
          </div>
          <div></div>
        </div>
      </Stack>
      <Divider variant="middle" sx={{ my: 3 }} />
      <div className="centraliser">
        <div></div>
        <div className="masonry">
          {resDMbios.map((resDMinfo) => (
            <ResDmBio {...resDMinfo} key={`bio_${resDMinfo.name}`} />
          ))}
        </div>
        <div></div>
      </div>
    </React.Fragment>
  );
}

export default Team;
