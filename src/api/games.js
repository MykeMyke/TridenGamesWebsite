import { apiHost, applyCsrf } from "./utils";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";

const gamesUrl = `${apiHost}/api/games/`

const req = (field) => {
  const label = typeof field === 'string' ? label : field.label;
  return `${label} is required`;
}

function getGames() {
  return axios.get(gamesUrl, {
    withCredentials: true
  });
}

async function getAllGames() {
  const rsp = await getGames();

  const data = rsp.data.map(game => {
    return {
      ...game,
      datetime: new Date(game.datetime),
      slot: Math.floor(new Date(game.datetime).getHours() / 4),
      datetime_open_release: game.datetime_open_release === null ? null : new Date(game.datetime_open_release),
      datetime_release: game.datetime_release === null ? null : new Date(game.datetime_release)
    }
  }).sort((a, b) => {
    return a.datetime - b.datetime;
  });
  return data;
}

export const timeSlots = [
  { value: 0, text: "Midnight-4AM" },
  { value: 1, text: "4AM-8AM" },
  { value: 2, text: "8AM-Noon" },
  { value: 3, text: "Noon-4PM" },
  { value: 4, text: "4PM-8PM" },
  { value: 5, text: "8PM-Midnight" },
]

export function useGames() {
  const { data, isLoading, isFetching, error, status } = useQuery({ queryKey: ['games'], queryFn: getAllGames });

  return {
    isLoading,
    data,
    error,
    status
  }
}

export function useGame({ id: gameId }) {
  const [errorMessage, setErrorMessage] = useState();
  const mutation = useMutation({
    mutationFn: (values) => {
      return axios.post(gamesUrl, values, { withCredentials: true, headers: applyCsrf()})
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
    }
  })
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .label("Name")
        .required(req),
      code: Yup.string()
        .label("Code")
        .required(req),
      description: Yup.string().label("Description").required(req).min(1, req),
      dateTime: Yup.date().required().min(new Date(), "Game start must be in the future"),
      dateTimePatreonRelease: Yup.date().label('Patreon Release').required().test(("dateTimePatreonRelease", (value, context) => {
        if (value.getTime() >= context.parent.dateTime.getTime()) {
          return context.createError({ path: "dateTimePatreonRelease", message: ({ label }) => `${label} must be before Game Time` });
        }
        return true;
      })),
      dateTimeOpenRelease: Yup.date().label('General Release').required().test(("dateTimeOpenRelease", (value, context) => {
        if (value.getTime() >= context.parent.dateTime.getTime()) {
          return context.createError({ path: "dateTimeOpenRelease", message: ({ label }) => `${label} must be before Game Time` });
        }
        if (value.getTime() <= context.parent.dateTimePatreonRelease.getTime()) {
          return context.createError({ path: "dateTimeOpenRelease", message: ({ label }) => `${label} must be after Patreon Release` });
        }
        return true;
      }))
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
      datetime: new Date(),
      datetime_release: new Date(),
      datetime_open_release: new Date(),
      length: "4 hours",
      ready: true

    },
    onSubmit: (values) => {
      console.info("This is only called if validation passes");
      console.info("need to map fields", values)
      mutation.mutate(values);
    }
  });

  return {
    formik,
    mutation,
    errorMessage
  }
}