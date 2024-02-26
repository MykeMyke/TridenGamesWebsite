import * as React from "react";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { ics, google, office365 } from "calendar-link";

export default function CalendarLink(props) {
  const { game } = props;
  const event = {
    title: `${game.module} (on Triden)`,
    description: `DM: ${game.dm_name}\nLevel: ${game.level_min}- ${game.level_max}\n\n${game.description
      .toString()
      .replace(/\s*\n\s*/, "\n")}\nContent Warnings: ${game.warnings}`,
    start: new Date(game.datetime),
    duration: [parseInt(game.duration), "hours"],
    location: "Roll20/Discord",
  };
  return (
    <React.Fragment>
      <Grid container direction="column" sx={{ px: 1, py: 1 }}>
        <Typography variant="cardmain">Add game to Calendars:</Typography>
        <Divider
          variant="middle"
          sx={{
            mt: 1.2,
            mb: 0.6,
          }}
        />
        <Link href={google(event)} underline="always" target="_blank">
          Google Calendar
        </Link>
        <Divider
          variant="middle"
          sx={{
            mt: 1.2,
            mb: 0.6,
          }}
        />
        <Link href={office365(event)} underline="always" target="_blank">
          Office365
        </Link>
        <Divider
          variant="middle"
          sx={{
            mt: 1.2,
            mb: 0.6,
          }}
        />
        <Link href={ics(event)} underline="always" target="_blank">
          .ics (Outlook, Apple, etc)
        </Link>
      </Grid>
    </React.Fragment>
  );
}
