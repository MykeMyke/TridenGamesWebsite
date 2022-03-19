import React from "react";
import { DateTime } from "luxon";

const readableWeekday = DateTime.now().toFormat("ccc");
const readableDate = DateTime.now().toLocaleString(DateTime.DATETIME_FULL);
const now =
  `${readableWeekday.toString()}` + " " + `${readableDate.toString()}`;

// console.log(now);

export default now;
