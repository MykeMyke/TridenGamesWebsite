import React from "react";
import "../styles/Global.css";

import ResDmBio from "../components/resDMbioCard";

// Assuming what you want is to have a single page with one card per DM, import that "data" here
import { resDMbios } from "../data/resDMbios";

import { Grid } from "@mui/material";

export default function ResDMs() {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        justify="center"
        sx={{ px: 2, mb: 3, position: "relative" }}
      >
        {/* and loop here, putting each DM as the property passed the card
        you would use the same pattern if you wanted to put thi son the meet the team page underneath the image
        importing the data above, and looping here */}
        {resDMbios.map((resDMinfo) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ResDmBio {...resDMinfo} key={`bio_${resDMinfo.name}`} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
