import "./Global.css";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Paper, Grid, Typography } from "@mui/material";
import { getGames } from "./api/games";
import Game from "./calendarCard";
import Container from "@mui/material/Container";
import { checkDaysToGo } from "./utils/daysToGo";
import TridenAvatar from "./img/TridenAvatar2048.png";

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
      setData(
        result.data.sort((a, b) => {
          return new Date(a.datetime) - new Date(b.datetime);
        })
      );
    });
  }, []);
  //Only filtering for future games at present
  const filteredData = data.filter((x) => Date.parse(x.datetime) > new Date());
  const lastDate = filteredData.map((a) => a.datetime).reverse()[0];

  return (
    <>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ ml: 1, mb: 2 }}
      >
        <Grid item>
          <img src={TridenAvatar} alt="Triden Games" className="Logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5" color="text.primary">
            There are <strong>{filteredData.length} games</strong> scheduled in
            the next {checkDaysToGo(lastDate)}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            Signups take place on{" "}
            <a href="https://discord.gg/tridengames">
              the Triden Discord server
            </a>
            .
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={3} justify="center" sx={{ pl: 2 }}>
        {filteredData.map((gameData) => (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Game {...gameData} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
