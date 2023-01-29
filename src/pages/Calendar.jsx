import "../styles/Global.css";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Skeleton } from "@mui/material";
import { Fab, Grid, Typography } from "@mui/material";
import { useGames } from "../api/games";
import Game from "../components/calendarCard";
import { checkDaysToGo } from "../utils/daysToGo";
import TridenAvatar from "../img/TridenAvatar2048.png";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Divider from "@mui/material/Divider";
import NameFilter from "../components/nameFilter";
import useLocalStorage, { deleteFromStorage } from "@rehooks/local-storage";

// the prefix serves as a namespace so we will not delete other keys, unless they pick this name
// leave this the same unless you have a reason to change this
const SHOW_KEY_PREFIX = "_tridenCalendarFilter_";

const slotsKey = `${SHOW_KEY_PREFIX}_slots`;
const nameFilterKey = `${SHOW_KEY_PREFIX}_nameFilter`;

function dummyGame(name) {
  return { dm_name: name, datetime: Math.random() };
}

function slotFilterFn(gameData, slots) {
  return slots.length === 0 || slots.some((s) => s === gameData.slot);
}

function nameFilterFn(gameData, activeName) {
  return (
    (gameData.players &&
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
        .includes(activeName.toLocaleLowerCase()))
  );
}

function filterGames(data, activeName, slot) {
  if (slot >= 0 || activeName?.length > 0) {
    return data.filter((gameData) => {
      return slotFilterFn(gameData, slot) && nameFilterFn(gameData, activeName);
    });
  } else {
    return data;
  }
}

export default function Calendar() {
  const [localName, setLocalName] = useLocalStorage(nameFilterKey, "");
  const [activeName, setActiveName] = useState(localName);
  const [localSlots, setLocalSlots] = useLocalStorage(slotsKey, "");
  const [slots, setSlots] = useState(
    localSlots
      .split("|")
      .filter((str) => str.length > 0)
      .map((str) => parseInt(str))
  );

  const { data, isLoading } = useGames();
  const filtered = useMemo(() => {
    if (isLoading || !data) {
      return [
        dummyGame("one"),
        dummyGame("two"),
        dummyGame("three"),
        dummyGame("four"),
        dummyGame("five"),
        dummyGame("six"),
        dummyGame("seven"),
        dummyGame("eight"),
        dummyGame("nine"),
        dummyGame("ten"),
        dummyGame("eleven"),
        dummyGame("twelve"),
      ];
    }
    return filterGames(data, activeName, slots);
  }, [isLoading, data, activeName, slots]);

  const lastDate = useMemo(() => {
    return data?.map((a) => a.datetime).reverse()[0] || new Date();
  }, [data]);

  useEffect(() => {
    if (activeName?.length) {
      setLocalName(activeName);
    } else {
      deleteFromStorage(nameFilterKey);
    }
  }, [setLocalName, activeName]);
  useEffect(() => {
    if (slots?.length) {
      setLocalSlots(slots.join("|"));
    } else {
      deleteFromStorage(slotsKey);
    }
  }, [setLocalSlots, slots]);
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
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              <>
                There are <strong>{data.length} games</strong> scheduled in the
                next {checkDaysToGo(lastDate)} days
              </>
            )}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              <>
                Signups to games on{" "}
                <a
                  href="https://discord.gg/JDB6BYTK9T"
                  target="_blank"
                  rel="noreferrer"
                >
                  the Triden Discord server
                </a>
                .
              </>
            )}
          </Typography>{" "}
          <Typography variant="subtitle1" color="text.primary">
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              <>
                Hover over or press the Players / Waitlist box for the list of
                who is signed up...
              </>
            )}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              <>
                Use the filters to search for your games, or for games as
                certain times.
              </>
            )}
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
            <Game
              props={gameData}
              isLoading={isLoading}
              activeName={activeName}
            />
          </Grid>
        ))}
        <Box>
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
        </Box>
      </Grid>
    </>
  );
}
