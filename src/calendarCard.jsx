import * as React from "react";
import PropTypes from "prop-types";
import { Box, typography } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActions, deprecatedPropType } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import FullDescPopover from "./FullDescPopover";
import { toLocalString } from "./utils/formatting";
import { checkTier } from "./utils/tier";
import { ReleaseDate } from "./utils/releasedate";

const Game = (props) => {
  const {
    module,
    name,
    datetime,
    length,
    number_of_players,
    max_players,
    number_of_waitlisted,
    description,
    dm_name,
    warnings,
    level_min,
    level_max,
    datetime_release,
    datetime_open_release,
  } = props;

  return (
    <Card raised="true" sx={{ maxWidth: 450 }}>
      <CardContent sx={{ pt: 0.75, pb: 0.2, "&:last-child": { pb: 0 } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography variant="h6" color="text.primary" marginRight={3}>
              {toLocalString(datetime)}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {length}
            </Typography>
          </Box>
          <Typography variant="subtitle" color="text.primary" sx={{ mr: 1 }}>
            {module}
          </Typography>
          <Typography variant="subtitle2" color="text.primary" display="block">
            {checkTier(level_min, level_max)}
          </Typography>
        </Grid>
        <Divider variant="middle" sx={{ mt: 1 }} />
        <Typography variant="h6" color="text.primary" sx={{ pt: 0.2 }}>
          {name}
        </Typography>
        <FullDescPopover desc={description} />
        <Divider variant="middle" sx={{ mb: 1 }} />
        <Typography variant="subtitle2" color="text.secondary" display="block">
          DM: {dm_name}
        </Typography>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          display="block"
          sx={{ pt: 0.5 }}
        >
          Content Warnings:
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" display="block">
          {warnings}
        </Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions sx={{ py: 0 }}>
        <Grid container direction="row" justifyContent="space-between">
          <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.primary">
              Players
            </Typography>
            <Typography variant="h6" color="text.primary">
              {number_of_players} / {max_players}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.primary">
              Waitlist
            </Typography>
            <Typography variant="h6" color="text.primary">
              {number_of_waitlisted}
            </Typography>
          </Box>
        </Grid>
      </CardActions>
      <CardActions sx={{ pt: 0.2 }}>
        <Typography variant="suffix" color="text.secondary">
          {ReleaseDate(datetime_release, datetime_open_release)}
        </Typography>
      </CardActions>
    </Card>
  );
};
export default Game;
