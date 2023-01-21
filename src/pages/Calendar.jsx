import "../styles/Global.css";
import React, { useMemo, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import { Fab, Grid, Typography } from "@mui/material";
import { useGames } from "../api/games";
import Game from "../components/calendarCard";
import { checkDaysToGo } from "../utils/daysToGo";
import TridenAvatar from "../img/TridenAvatar2048.png";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import NameFilter from "../components/nameFilter";

function dummyGame(name) {
  return { dm_name: name, datetime: Math.random()}
}

function slotFilterFn(gameData, slots) {
    return slots.length === 0 || slots.some(s => s === gameData.slot)
}

function nameFilterFn(gameData, activeName) {
  return ((gameData.players &&
          gameData.players.some(
            (player) =>
              player &&
              ((player.discord_name &&
                player.discord_name
                  .toLocaleLowerCase()
                  .includes(activeName.toLocaleLowerCase())) ||
                (player.discord_id &&
                  player.discord_id.toString().toLocaleLowerCase() ===
                  activeName.toLocaleLowerCase()))
          )) ||
          (gameData.dm_name &&
            gameData.dm_name
              .toLocaleLowerCase()
              .includes(activeName.toLocaleLowerCase())))
}


function filterGames(data, activeName, slot) {
  if (slot >= 0 || activeName?.length > 0) {
    return data.filter(
      (gameData) => {
        return slotFilterFn(gameData, slot) && nameFilterFn(gameData, activeName)
      });
  } else {
    return data;
  }
}

export default function Calendar() {
  const [activeName, setActiveName] = useState("");
  const [slots, setSlots] = useState([]);
  
  const { data, isLoading } = useGames();
  const filtered = useMemo(() => {
    if (isLoading || !data) {
      return [dummyGame("one"), dummyGame("two"), dummyGame("three"), dummyGame("four")]
    }
    return filterGames(data, activeName, slots);
  }, [isLoading, data, activeName, slots])
  
  const lastDate = useMemo(() => {
    return data?.map((a) => a.datetime).reverse()[0] || new Date();
  }, [data]);
  return (
    <>
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
        {isLoading ? <Skeleton /> : <>There are <strong>{data.length} games</strong> scheduled in the next{" "}
          {checkDaysToGo(lastDate)} days</>}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
        {isLoading ? <Skeleton /> : <>Signups to games on{" "}
          <a
            href="https://discord.gg/JDB6BYTK9T"
            target="_blank"
            rel="noreferrer"
          >
            the Triden Discord server
          </a>
          .</>}
          </Typography>{" "}
          <Typography variant="subtitle1" color="text.primary">
        {isLoading ? <Skeleton /> : <>(PC: Hover over the Players / Waitlist box for the list of who is
          signed up...) (Mobile: Press and hold for same)</>}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ mb: 2.5 }} />
      <NameFilter
        data={data}
        slots={slots}
        setSlots={setSlots}
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
            <Game props={gameData} isLoading={isLoading} activeName={activeName} />
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
    </>
  );
}
