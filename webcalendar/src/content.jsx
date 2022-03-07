import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Paper, Grid } from "@mui/material";
import { getGames } from "./api/games";
import Game from "./calendarCard";
import { DateTime } from "luxon";
//import { dataProcessed } from "./DateTime.mjs";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Content() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getGames().then((result) => {
      setData(result.data);
    });
  }, []);

  const sorted = data.sort((a, b) => {
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0;
    return sorted;
  });

  const translate = sorted.forEach((game) => {
    const readableWeekday = DateTime.fromISO(game.date).toFormat("ccc");
    const readableDate = DateTime.fromISO(game.date).toLocaleString(
      DateTime.DATETIME_FULL
    );
    sorted["displayDate"] =
      `${readableWeekday.toString()}` + " " + `${readableDate.toString()}`;
  });

  return (
    <Grid container spacing={3}>
      {sorted.map((gameData) => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Game {...gameData} />
        </Grid>
      ))}
    </Grid>
  );
}
