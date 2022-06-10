import React from "react";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";
import BenefitsSummary from "../img/Signup Credits.png";
import { Divider } from "@mui/material";
import Button from "@mui/material/Button";

function Benefits() {
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
          <Typography variant="h4" sx={{ my: 1, textAlign: "center" }}>
            The big question: "Do I need to pay?"
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            "No" is the simple answer. Anybody can sign up to any of the games
            that Triden offers, and access the fantastic community, along with
            the advice and support they provide.
          </Typography>
          <Divider
            variant="middle"
            sx={{
              my: 2,
            }}
          />
          <Typography variant="h4" sx={{ mt: 1, textAlign: "center" }}>
            Benefits for Triden supporters:{" "}
          </Typography>
          <Typography variant="body1">
            <ul>
              <li>
                <strong>For Players:</strong> there is early signup access to
                the Resident DM schedule of one shots every month as well access
                to fully featured compendiums in both D&D Beyond and Roll20.{" "}
              </li>
              <li>
                {" "}
                <strong>For DMs:</strong> there is access to adventure modules
                as well as maps, art, music and more to help you run awesome
                games!
              </li>
            </ul>
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Triden is able to share resources with its members because they are
            contributing to the purchase. As an LLP and by paying careful
            attention to the usage licenses we make sure we stay completely
            legal!
          </Typography>{" "}
          <Divider
            variant="middle"
            sx={{
              my: 2,
            }}
          />
          <Typography variant="h4" sx={{ my: 1, textAlign: "center" }}>
            Sign up on{" "}
            <Button
              variant="contained"
              href="https://www.patreon.com/tridengames"
              size="large"
              // sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
              color="secondary"
            >
              <strong>Patreon</strong>
            </Button>{" "}
            for additional benefits!
          </Typography>
          <Typography variant="body1">
            The tiers shown below are only a summary - check out full details on
            Patreon! In addition, there is a maps only tier (Wanderer) for those
            that aren't interested in playing on the server.
          </Typography>
        </Grid>
        <Grid item>
          <img
            src={BenefitsSummary}
            alt="Triden Games Benefits"
            className="MainBanner"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Benefits;
