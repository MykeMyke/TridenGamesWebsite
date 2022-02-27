import React from "react";
import Game from "./calendarCard";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DjangoDataImport from "./gameData";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Content = () => {
  const buildCalendarCard = (djangoGameData) => {
    return (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Game {...djangoGameData} />
      </Grid>
    );
  };

  return (
    <Grid container spacing={3}>
      {DjangoDataImport.map((djangoGamaData) =>
        buildCalendarCard(djangoGamaData)
      )}
    </Grid>
  );
};

export default Content;
