import React from "react";
import { DateTime } from "luxon";
import { data } from "./content";

// Dummy api datetime value
// const serverTime = "2022-03-04T01:00:00Z";

// Need to read in the array from api get in useEffects then sort on datetime
const sorted_datetime = data.sort((a, b) => {
  return a.datetime < b.datetime ? -1 : a.datetime > b.datetime ? 1 : 0;
});

const displayDate = () => {
  const readableWeekday = DateTime.fromISO(sorted_datetime).toFormat("ccc");
  const readableDate = DateTime.fromISO(sorted_datetime).toLocaleString(
    DateTime.DATETIME_FULL
  );
  return `${readableWeekday.toString()}` + " " + `${readableDate.toString()}`;
};

//console.log(displayDate);

// displayDate is the output to the card
// but need to overwrite datetime values in array with it then pass back the array into the map function
export default displayDate;
