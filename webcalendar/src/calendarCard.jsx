import * as React from "react";
import PropTypes from "prop-types";
import { Box, ThemeProvider, typography } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CardActionArea, CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

const Game = (props) => {
  const {
    AdvCode,
    AdvName,
    Date,
    Time,
    Duration,
    CurrentPlayers,
    MaxPlayers,
    WaitlistCount,
    DescriptionFull,
    DM,
    Warnings,
  } = props;
  return (
    <Card sx={{ maxWidth: 450 }}>
      /* DISABLE CARD ACTION CLICKABLE SURFACE*/
      {/* <CardActionArea> */}
      {/* <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/contemplative-reptile.jpg"
          alt="green iguana"
        /> */}
      <CardContent sx={{ pt: 0.75, pb: 0.2, "&:last-child": { pb: 0 } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          /*NEED TO REFACTOR AS GRID ITEMS*/
          <Box>
            <Typography variant="h6" color="text.secondary" marginRight={3}>
              {Date}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              display="block"
            >
              {Game.Time}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {Duration}
            </Typography>
          </Box>
          <Typography variant="subtitle" color="text.secondary">
            {AdvCode}
          </Typography>
        </Grid>
        <Divider variant="middle" sx={{ mt: 1 }} />
        <Typography variant="h6" color="text.secondary" sx={{ pt: 0.2 }}>
          {AdvName}
        </Typography>
        <Button
          variant="contained"
          size="small"
          sx={{ pt: 0.2, pb: 0, mb: 1.5 }}
        >
          Details
        </Button>
        <Divider variant="middle" sx={{ mb: 1 }} />
        <Typography variant="subtitle2" color="text.secondary" display="block">
          DM: {DM}
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
          {Warnings}
        </Typography>{" "}
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions sx={{ py: 0 }}>
        <Grid container direction="row" justifyContent="space-between">
          <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Players
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {CurrentPlayers} / {MaxPlayers}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Waitlist
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {WaitlistCount}
            </Typography>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  );
};
export default Game;
