import React from "react";
import { Typography } from "@mui/material";
import TridenEtched from "../img/Triden Etched Roundel Transparent-Web.png";
import Grid from "@mui/material/Grid";

function ErrorPage() {
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ mt: 2 }}
      >
        <Grid item sx={{ ml: 1.5, pr: 1.5 }}>
          <img src={TridenEtched} alt="Triden Games" className="Logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="subtitle1" color="text.primary">
            This is not the page you're looking for... Maybe head back to{" "}
            <strong>
              <a href="https://www.tridengames.com">the homepage</a>
            </strong>{" "}
            ok?
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default ErrorPage;
