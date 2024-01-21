import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Skeleton, Divider } from "@mui/material";
import { Fab, Grid, Typography } from "@mui/material";

import AddBoxIcon from "@mui/icons-material/AddBox";

import useLocalStorage, { deleteFromStorage } from "@rehooks/local-storage";

import { useGames } from "../api/games";
import Game from "../components/calendarCard";
import NameFilter from "../components/nameFilter";
import { checkDaysToGo } from "../utils/daysToGo";
import JoinDiscordButton from "../components/authentication/JoinDiscordButton";
import LoginButton from "../components/authentication/LoginButton";
import useUserStore from "../stores/useUserStore";
import "../styles/Global.css";

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
          ((player.discord_name && player.discord_name.toLocaleLowerCase().includes(activeName.toLocaleLowerCase())) ||
            (player.discord_id && player.discord_id.toString().toLocaleLowerCase() === activeName.toLocaleLowerCase()))
      )) ||
    (gameData.standby &&
      gameData.standby.some(
        (player) =>
          player &&
          ((player.discord_name && player.discord_name.toLocaleLowerCase().includes(activeName.toLocaleLowerCase())) ||
            (player.discord_id && player.discord_id.toString().toLocaleLowerCase() === activeName.toLocaleLowerCase()))
      )) ||
    (gameData.dm_name && gameData.dm_name.toLocaleLowerCase().includes(activeName.toLocaleLowerCase()))
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

function createSlots(storedSlot) {
  if (storedSlot) {
    if (typeof storedSlot === "number") {
      return [storedSlot];
    }
    return storedSlot
      .split("|")
      .filter((str) => str.length > 0)
      .map((str) => parseInt(str));
  }
  return [];
}

function DiscordButton({ children }) {
  return (
    <JoinDiscordButton
      color="secondary"
      sx={{
        py: 0.5,
        px: 0.8,
        lineHeight: "1.2",
        textAlign: "center",
        fontSize: "0.75rem",
      }}
    >
      {children}
    </JoinDiscordButton>
  );
}

export default function Calendar() {
  const [localName, setLocalName] = useLocalStorage(nameFilterKey, "");
  const [activeName, setActiveName] = useState(localName);
  const [localSlots, setLocalSlots] = useLocalStorage(slotsKey, "");
  const [slots, setSlots] = useState(createSlots(localSlots));
  const user = useUserStore((s) => s.user);
  const { data, isLoading, joinGame, dropGame } = useGames();
  const userModifiedData = useMemo(() => {
    if (data && user.loggedIn) {
      return data.map((game) => {
        return {
          ...game,
          is_dm: !!(game.dm_name.toLowerCase() === user.username.toLowerCase()),
          playing: !!(game.players.indexOf(user.username) >= 0),
          playing: game.players.findIndex((p) => p.discord_name.toLowerCase() === user.username.toLowerCase()) >= 0,
          standingBy: game.standby.findIndex((p) => p.discord_name.toLowerCase() === user.username.toLowerCase()) >= 0,
        };
      });
    } else {
      return (
        data?.map((game) => {
          return { ...game, is_dm: false, playing: false };
        }) || []
      );
    }
  }, [data, user]);

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
    return filterGames(userModifiedData, activeName, slots);
  }, [isLoading, userModifiedData, activeName, slots, user]);

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

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Grid container spacing={1} direction="row" alignItems="center" justifyContent="flex-start" sx={{ mb: 2 }}>
        <Grid item sx={{ ml: 1.5, pr: 1.5 }}>
          <img src="/img/TridenAvatar2048.png" alt="Triden Games" className="Logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="h5" color="text.primary" sx={{ fontSize: "1.2rem" }}>
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              <React.Fragment>
                <strong>
                  {data.length} game{data.length === 1 ? "" : "s"}
                </strong>{" "}
                in the next {checkDaysToGo(lastDate)} days
              </React.Fragment>
            )}
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            {isLoading ? (
              <Skeleton animation="wave" />
            ) : (
              <>
                {user.loggedIn ? (
                  <>
                    {user.credit_max
                      ? `${user.credit_available}/${user.credit_max} credit${user.credit_max === 1 ? "" : "s"}`
                      : "No credtits"}{" "}
                    available
                  </>
                ) : (
                  <React.Fragment>
                    <DiscordButton>Join Our Discord</DiscordButton> and{" "}
                    <LoginButton
                      sx={{
                        px: 0,
                        lineHeight: "1.2",
                        my: 1.5,
                        textAlign: "center",
                        fontSize: "0.75rem",
                      }}
                    >
                      Login
                    </LoginButton>{" "}
                    to play
                  </React.Fragment>
                )}
              </>
            )}
          </Typography>
        </Grid>
      </Grid>
      <Divider variant="middle" sx={{ mb: 2.5 }} />
      <NameFilter data={data} slots={slots} setSlots={setSlots} activeName={activeName} setActiveName={setActiveName} />
      <Grid container spacing={3} justify="center" sx={{ px: 2, mb: 3, position: "relative" }}>
        {filtered.map((gameData) => (
          <Grid key={`${gameData.dm_name}_${gameData.datetime}_${gameData.id}`} item xs={12} sm={6} md={4} lg={3}>
            <Game
              props={gameData}
              isLoading={isLoading}
              activeName={activeName}
              joinGame={joinGame}
              dropGame={dropGame}
            />
          </Grid>
        ))}
        {user?.isDm ? (
          <Box>
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              sx={{ position: "fixed", bottom: "1%", right: "10%" }}
              onClick={() => navigate("/members/games/new")}
            >
              <AddBoxIcon fontSize="large" sx={{ mr: 1 }} /> Create a Game
            </Fab>
          </Box>
        ) : null}
      </Grid>
    </React.Fragment>
  );
}
