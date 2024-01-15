import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function getGames() {
  let url = "https://unseen-servant.digitaldemiplane.com/api/games/";
  return axios.get(url);
}

async function gg() {
  const rsp = await getGames();
  
  const data = rsp.data.map(game => {
          return {
            ...game,
            datetime: new Date(game.datetime),
            slot: Math.floor(new Date(game.datetime).getHours()/4),
            datetime_open_release: game.datetime_open_release === null ? null : new Date(game.datetime_open_release),
            datetime_release: game.datetime_release === null ?  null : new Date(game.datetime_release)
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
  const {data, isLoading, isFetching, error, status } = useQuery({ queryKey: ['games'], queryFn: gg, });

  return { 
    isLoading,
    data,
    error,
    status
  }
}