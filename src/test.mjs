import React from "react";
import { DateTime } from "luxon";

let game = [
  { name: "alpha", date: "2022-03-11T01:00:00Z", players: 2 },
  { name: "charlie", date: "2022-03-06T22:00:00Z", players: 7 },
  { name: "delta", date: "2022-03-03T09:10:00Z", players: 0 },
  { name: "bravo", date: "2022-03-18T01:00:00Z", players: 3 },
];

const sorted = game.sort((a, b) => {
  return a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
});

// const displayDate = (sorted) => {
//   const readableWeekday = DateTime.fromISO(sorted.date).toFormat("ccc");
//   const readableDate = DateTime.fromISO(sorted.date).toLocaleString(
//     DateTime.DATETIME_FULL
//   );
//   return `${readableWeekday.toString()}` + " " + `${readableDate.toString()}`;
// };

const test = sorted.forEach((game) => {
  const readableWeekday = DateTime.fromISO(game.date).toFormat("ccc");
  const readableDate = DateTime.fromISO(game.date).toLocaleString(
    DateTime.DATETIME_FULL
  );
  game["newdate"] =
    `${readableWeekday.toString()}` + " " + `${readableDate.toString()}`;
});

console.log(sorted);
// console.log(displayDate);
//console.log(test);

export default displayDate;
// return a.datetime < b.datetime ? -1 : a.datetime > b.datetime ? 1 : 0;
