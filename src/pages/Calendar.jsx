import "../styles/Global.css";
import React, { useState, useEffect } from "react";

import { Fab, Grid, Typography } from "@mui/material";
import { getGames } from "../api/games";
import Game from "../components/calendarCard";
import { checkDaysToGo } from "../utils/daysToGo";
import TridenAvatar from "../img/TridenAvatar2048.png";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import NameFilter from "../components/nameFilter";

export default function Calendar() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([data]);
  const [activeName, setActiveName] = useState([]);

  useEffect(() => {
    getGames().then((result) => {
      setData(
        result.data.sort((a, b) => {
          return new Date(a.datetime) - new Date(b.datetime);
        })
      );
      // **Don't believe this is necessary since it is handled by backend prior to API endpoint**
      // setData(data.filter((x) => Date.parse(x.datetime) > new Date()));
    });
  }, []);
  const lastDate = data.map((a) => a.datetime).reverse()[0];
  return (
    <React.Fragment>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ mb: 2 }}
      >
        <Grid item sx={{ ml: 1.5, pr: 1.5 }}>
          <img src={TridenAvatar} alt="Triden Games" className="Logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontSize: "1.2rem" }}
          >
            There are <strong>{data.length} games</strong> scheduled in the next{" "}
            {checkDaysToGo(lastDate)} days
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            Signups to games on{" "}
            <a
              href="https://discord.gg/JDB6BYTK9T"
              target="_blank"
              rel="noreferrer"
            >
              the Triden Discord server
            </a>
            .
          </Typography>{" "}
          <Typography variant="subtitle1" color="text.primary">
            (PC: Hover over the Players / Waitlist box for the list of who is
            signed up...) (Mobile: Press and hold for same)
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ mb: 2.5 }} />
      <NameFilter
        data={data}
        setFiltered={setFiltered}
        activeName={activeName}
        setActiveName={setActiveName}
      />
      <Grid
        container
        spacing={3}
        justify="center"
        sx={{ px: 2, mb: 3, position: "relative" }}
      >
        {filtered.map((gameData) => (
          <Grid
            key={`${gameData.dm_name}_${gameData.datetime}`}
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Game props={gameData} activeName={activeName} />
          </Grid>
        ))}
        <box>
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: "1%", right: "10%" }}
            href="https://unseen-servant.digitaldemiplane.com/admin/core/game/add/"
            target="_blank"
            rel="noreferrer"
          >
            <AddBoxIcon fontSize="large" sx={{ mr: 1 }} /> Create a Game
          </Fab>
        </box>
      </Grid>
    </React.Fragment>
  );
}
