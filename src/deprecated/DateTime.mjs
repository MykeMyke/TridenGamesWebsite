import React from "react";
import { DateTime } from "luxon";
// import { data } from "./content.jsx";

const sorted_datetime = data.sort((a, b) => {
  return a.datetime < b.datetime ? -1 : a.datetime > b.datetime ? 1 : 0;
  console.log(sorted_datetime);
});

// const displayDate = () => {
//   const readableWeekday = DateTime.fromISO(sorted_datetime).toFormat("ccc");
//   const readableDate = DateTime.fromISO(sorted_datetime).toLocaleString(
//     DateTime.DATETIME_FULL
//   );
//   return `${readableWeekday.toString()}` + " " + `${readableDate.toString()}`;
// };

const test = sorted.forEach((game) => {
  const readableWeekday = DateTime.fromISO(game.date).toFormat("ccc");
  const readableDate = DateTime.fromISO(game.date).toLocaleString(
    DateTime.DATETIME_FULL
  );
  game["displayDate"] =
    `${readableWeekday.toString()}` + " " + `${readableDate.toString()}`;
});

export default dataProcessed;
