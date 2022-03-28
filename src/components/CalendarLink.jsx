import * as React from "react";
import ICalendarLink from "react-icalendar-link";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import moment from "moment";

export default function CalendarLink(props) {
  const { game } = props;
  var enddate = new Date(game.datetime);
  enddate.setHours(enddate.getHours() + parseInt(game.length));
  const event = {
    title: game.module,
    description:
      "DM: " +
      game.dm_name +
      "\\nLevel:" +
      game.level_min +
      " - " +
      game.level_max +
      "\\n" +
      game.description.toString().replace(/\s*\n\s*/, "\\n") +
      "\\nContent Warnings: " +
      game.warnings,
    startTime: new Date(game.datetime).toISOString(),
    endTime: enddate.toISOString(),
    location: "Discord + Roll20",
  };
  const gLink = decodeURI(
    `http://www.google.com/calendar/event?action=TEMPLATE&dates=${moment
      .utc(game.datetime)
      .format("YYYYMMDD[T]HHmmss[Z]")}` +
      "%2F" +
      `${moment.utc(event.endTime).format("YYYYMMDD[T]HHmmss[Z]")}&text=${
        event.title
      } (on Triden)&location=&details=Game on Triden. \n` +
      `${game.module} (${game.name}). \n` +
      `DM: ${game.dm_name}. \n` +
      `Levels ${game.level_min} - ${game.level_max}. \n` +
      `Content Warnings: ${game.warnings}. \n\n` +
      `Description: \n${game.description}`
  );
  // const gLink = `http://www.google.com/calendar/event?action=TEMPLATE&dates=${
  //   event.startTime
  // }%2F${event.endTime}&text=${
  //   event.title
  // }&location=&details=${event.description.replace(/\s/g, "%20")}`;
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
        <ICalendarLink event={event}>
          .ics file (Oulook, Apple, etc)
        </ICalendarLink>
        <Divider
          variant="middle"
          sx={{
            mt: 1.2,
            mb: 0.6,
          }}
        />
        <a href={gLink} target="_blank" rel="noreferrer">
          Google (beta - check local start time)
        </a>
      </Grid>
    </React.Fragment>
  );
}
