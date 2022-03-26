import * as React from "react";
import ICalendarLink from "react-icalendar-link";

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
  return (
    <ICalendarLink event={event}>.ics file (Oulook, Apple, etc)</ICalendarLink>
  );
}
