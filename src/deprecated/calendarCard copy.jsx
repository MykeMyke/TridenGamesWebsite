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

// const game = {
//   AdvCode: "Adv Code",
//   AdvName: "Adventure Name",
//   Date: "Date:D",
//   Time: "Time:t",
//   Duration: "# hours",
//   CurrentPlayers: "X",
//   MaxPlayers: "Y",
//   WaitlistCount: "Z",
//   DescriptionFull:
//     "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, a minima ullam veritatis sed vero consequuntur animi velit consequatur voluptatem recusandae accusantium ratione sunt? Odio, ab earum? Neque, natus ab.",
//   DM: "DM Alias",
//   Warnings: "Any content / trigger warnings.",
// };

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 450 }}>
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
          <Box>
            <Typography variant="h6" color="text.secondary" marginRight={3}>
              {game.Date}
            </Typography>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              display="block"
            >
              {game.Time}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {game.Duration}
            </Typography>
          </Box>
          <Typography variant="subtitle" color="text.secondary">
            {game.AdvCode}
          </Typography>
        </Grid>
        <Divider variant="middle" sx={{ mt: 1 }} />
        <Typography variant="h6" color="text.secondary" sx={{ pt: 0.2 }}>
          {game.AdvName}
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
          {/* {game.DescriptionFull} */}
          DM: {game.DM}
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
          {game.Warnings}
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
              {game.CurrentPlayers} / {game.MaxPlayers}
            </Typography>
          </Box>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Waitlist
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {game.WaitlistCount}
            </Typography>
          </Box>
        </Grid>
      </CardActions>
    </Card>
  );
}
