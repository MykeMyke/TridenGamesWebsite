import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFormik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import axios from "axios";

import { UserContext } from "../App";

import { apiHost, applyCsrf } from "./utils";
import { nextWeek, tomorrow } from "../utils/datetime";

const gamesUrl = `${apiHost}/api/games/`;

/**
 * Convience method just so we dont have to type this on every required validation.
 * @param {*} field they field, either an object with a label or a string label
 * @returns a string error message
 */
const req = (field) => {
  const label = typeof field === "string" ? label : field.label;
  return `${label} is required`;
};

/**
 * Get all games.
 * @returns the axios response
 */
function getGames() {
  return axios.get(gamesUrl, {
    withCredentials: true,
  });
}

/**
 * Get a single game by its id
 * @param {*} id the pk of the game
 * @returns the axios response
 */
function getGame(id) {
  return axios.get(gamesUrl + id, {
    withCredentials: true,
  });
}

function createGame(values) {
  return axios.post(gamesUrl, values, {
    withCredentials: true,
    headers: applyCsrf(),
  });
}

function updateGame(values) {
  return axios.patch(`${gamesUrl}${values.id}/`, values, {
    withCredentials: true,
    headers: applyCsrf(),
  });
}

function deleteGameById(id) {
  return axios.delete(`${gamesUrl}${id}/`, {
    withCredentials: true,
    headers: applyCsrf(),
  });
}

export const timeSlots = [
  { value: 0, text: "Midnight-4AM" },
  { value: 1, text: "4AM-8AM" },
  { value: 2, text: "8AM-Noon" },
  { value: 3, text: "Noon-4PM" },
  { value: 4, text: "4PM-8PM" },
  { value: 5, text: "8PM-Midnight" },
];

/**
 * The hook to get games
 * @returns the games, formatted for use
 */
export function useGames() {
  const { user } = useContext(UserContext);
  const { data, isLoading, isFetching, error, status } = useQuery({
    queryKey: ["games"],
    queryFn: async () => {
      const rsp = await getGames();

      const data = rsp.data
        .map((game) => {
          return {
            ...game,
            datetime: new Date(game.datetime),
            players: game.players.filter((player) => !player.standby),
            standby: game.players.filter((player) => player.standby),
            slot: Math.floor(new Date(game.datetime).getHours() / 4),
            datetime_open_release:
              game.datetime_open_release === null
                ? null
                : new Date(game.datetime_open_release),
            datetime_release:
              game.datetime_release === null
                ? null
                : new Date(game.datetime_release),
            is_dm: user.isLoggedIn && user.username === game.dm_name,
          };
        })
        .sort((a, b) => {
          return a.datetime - b.datetime;
        });
      return data;
    },
  });

  return {
    isLoading: isFetching,
    data,
    error,
    status,
  };
}

/**
 * Get a game by a hook and return a form and methods to manipulate
 * @param {*} id the pk of a game, or "new"
 * @returns
 */
export function useGame(id) {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(id !== "new");
  const [errorMessage, setErrorMessage] = useState();
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("created") === "true") {
      setSuccessMessage("Game has been created");
    }
  }, [searchParams]);
  const {
    data: game,
    status,
    error: gameError,
  } = useQuery({
    queryKey: ["games", id],
    queryFn: async ({ queryKey }) => {
      setIsLoading(true);
      const game = await getGame(queryKey[1]);
      if (game?.data) {
        return {
          ...game.data,
          datetime: moment(game.data.datetime).toDate(),
          datetime_release: moment(game.data.datetime_release).toDate(),
          datetime_open_release: moment(
            game.data.datetime_open_release
          ).toDate(),
        };
      }
      throw Error("Cannot parse game");
    },
    enabled: id !== "new",
  });
  useEffect(() => {
    if (status === "success") {
      formik.setValues(game);
      setIsLoading(false);
    }
  }, [game, status]);

  const deleteGame = useMutation({
    mutationFn: (values) => {
      setIsLoading(true);
      return deleteGameById(id);
    },
    enabled: id !== "new",
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
      navigate("/calendar");
    },
  });

  const saveGame = useMutation({
    mutationFn: (values) => {
      setIsLoading(true);
      if (id === "new") {
        return createGame(values);
      }
      return updateGame(values);
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: (response) => {
      if (id === "new") {
        navigate(`/members/games/edit/${response.data.id}?created=true`);
      } else {
        setSuccessMessage("Game has been updated");
      }
    },
    onError: (error) => {
      if (error?.response?.status) {
        switch (error.response.status) {
          case 400:
            setErrorMessage(error.response.data?.message || error.message);
            const fieldErrors = error.response?.data.errors;
            formik.setErrors(fieldErrors);
            break;
          case 403:
          case 500:
          default:
            setErrorMessage(error.response.data?.message || error.message);
        }
      }
    },
  });
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      name: Yup.string().label("Name").required(req),
      module: Yup.string().label("Module Code").required(req),
      description: Yup.string().label("Description").required(req).min(1, req),
      warnings: Yup.string().label("Warnings"),
      datetime: Yup.date()
        .required()
        .min(new Date(), "Game start must be in the future"),
      datetime_release: Yup.date()
        .label("Patreon Release")
        .required()
        .test(
          ("datetime_release",
          (value, context) => {
            if (value.getTime() >= context.parent.datetime.getTime()) {
              return context.createError({
                path: "datetime_release",
                message: ({ label }) => `${label} must be before Game Time`,
              });
            }
            return true;
          })
        ),
      datetime_open_release: Yup.date()
        .label("General Release")
        .required()
        .test(
          ("datetime_open_release",
          (value, context) => {
            if (value.getTime() >= context.parent.datetime.getTime()) {
              return context.createError({
                path: "datetime_open_release",
                message: ({ label }) => `${label} must be before Game Time`,
              });
            }
            if (value.getTime() <= context.parent.datetime_release.getTime()) {
              return context.createError({
                path: "datetime_open_release",
                message: ({ label }) =>
                  `${label} must be after Patreon Release`,
              });
            }
            return true;
          })
        ),
    }),
    initialValues: {
      name: "",
      module: "",
      realm: "Forgotten Realms",
      variant: "Resident AL",
      description: "",
      max_players: 6,
      tier: 1,
      level_min: 1,
      level_max: 4,
      warnings: "",
      streaming: false,
      play_test: false,
      datetime: nextWeek(),
      datetime_release: new Date(),
      datetime_open_release: tomorrow(),
      length: "4 hours",
      ready: true,
    },
    onSubmit: (values) => {
      saveGame.mutate(values);
    },
  });

  return {
    isLoading,
    formik,
    saveGame,
    errorMessage,
    successMessage,
    deleteGame,
  };
}
