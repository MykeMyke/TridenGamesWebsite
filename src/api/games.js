import { apiHost, applyCsrf } from "./utils";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router-dom";

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

function getGame(id) {
  return axios.get(gamesUrl + id , {
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
    isLoading: isFetching,
    data,
    error,
    status
  }
}

export function useGame(id) {
  const [isLoading, setIsLoading] = useState(id !== 'new');
  const [errorMessage, setErrorMessage] = useState();  
  const [successMessage, setSuccessMessage] = useState();  
  const navigate = useNavigate();
  const [ searchParams, setSearchParams ] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("created") === 'true') {
      setSuccessMessage("Game has been created"); 
    }
  }, [ searchParams])
  const { data: game, status, error: gameError } = useQuery({
    queryKey: ['games', id],
    queryFn: async ({ queryKey }) => {
      setIsLoading(true)
      const game = await getGame(queryKey[1]);
      if (game?.data) {
        return {
          ...game.data,
          datetime: moment(game.data.datetime).toDate(),
          datetime_release: moment(game.data.datetime_release).toDate(),
          datetime_open_release: moment(game.data.datetime_open_release).toDate()
        }
      }
      throw Error("Cannot parse game");
    },
    enabled: id !== 'new'
  })
  useEffect(() => {
    if (status === 'success') {
      formik.setValues(game)
      setIsLoading(false);
    }
  }, [game, status])
  
  const mutation = useMutation({
    mutationFn: (values) => {
      setIsLoading(true);
      return axios.post(gamesUrl, values, { withCredentials: true, headers: applyCsrf()})
    },
    onSettled: () => {
      setIsLoading(false);
    },
    onSuccess: (response) => {
      navigate(`/members/games/edit/${response.data.id}?created=true`)
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
      warnings: Yup.string().label("Warnings").required(req).min(1, req),
      datetime: Yup.date().required().min(new Date(), "Game start must be in the future"),
      datetime_release: Yup.date().label('Patreon Release').required().test(("datetime_release", (value, context) => {
        if (value.getTime() >= context.parent.datetime.getTime()) {
          return context.createError({ path: "datetime_release", message: ({ label }) => `${label} must be before Game Time` });
        }
        return true;
      })),
      datetime_open_release: Yup.date().label('General Release').required().test(("datetime_open_release", (value, context) => {
        if (value.getTime() >= context.parent.datetime.getTime()) {
          return context.createError({ path: "datetime_open_release", message: ({ label }) => `${label} must be before Game Time` });
        }
        if (value.getTime() <= context.parent.datetime_release.getTime()) {
          return context.createError({ path: "datetime_open_release", message: ({ label }) => `${label} must be after Patreon Release` });
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
      mutation.mutate(values);
    }
  });
  
  return {
    isLoading,
    formik,
    mutation,
    errorMessage,
    successMessage
  }
}