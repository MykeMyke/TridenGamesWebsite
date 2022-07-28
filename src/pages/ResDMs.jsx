import React from "react";
import "../styles/Global.css";

import ResDmBio from "../components/resDMbioCard";

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
        {resDMbios.map((resDMinfo) => (
          <Grid item xs={12} lg={6}>
            <ResDmBio {...resDMinfo} key={`bio_${resDMinfo.name}`} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
