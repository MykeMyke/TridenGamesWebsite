import React, {useState, useEffect} from "react";

import { styled } from "@mui/material/styles";
import { Paper, Grid } from '@mui/material'

import {getGames} from './api/games'
import Game from "./calendarCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Content() {
  const [data, setData] = useState([])

  useEffect(() => {
    getGames().then(result => setData(result.data))
  }, [])

  return (
    <Grid container spacing={3}>
      { data.map((game) => {
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Game {...game} />
      </Grid>
      })}
    </Grid>
  );
};
