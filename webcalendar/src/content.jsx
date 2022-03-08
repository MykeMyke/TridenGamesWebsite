import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Paper, Grid, Typography } from "@mui/material";
import { getGames } from "./api/games";
import Game from "./calendarCard";
import Container from "@mui/material/Container";

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

  return (
    <>
      <Container sx={{ mb: 3 }}>
        <Typography variant="h5">
          There are {filteredData.length} games scheduled in the near future
        </Typography>
        <Typography variant="subtitle1">
          Signups take place on{" "}
          <a href="https://discord.gg/tridengames">the Triden Discord server</a>
          .
        </Typography>
      </Container>
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
