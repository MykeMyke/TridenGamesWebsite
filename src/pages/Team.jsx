import React from "react";
import { Grid } from "@mui/material";
import Staff from "../img/20220610_Triden Roles and Responsibilities.jpg";

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
    </React.Fragment>
  );
}

export default Team;
