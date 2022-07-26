import React from "react";
import "../styles/Global.css";

import ResDMbios from "../components/resDMbioCard";

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
        {ResDMbios.map((resDMinfo) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ResDMbios {...resDMinfo} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
