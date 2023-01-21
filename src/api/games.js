import { useState, useEffect } from "react";
import axios from "axios";

function getGames() {
  let url = "https://unseen-servant.digitaldemiplane.com/api/games/";
  return axios.get(url);
}

export const timeSlots = [
  { value: 0, text: "Midnight-4AM" },
  { value: 1, text: "4AM-8AM" },
  { value: 2, text: "8AM-Noon" },
  { value: 3, text: "Noon-4PM" },
  { value: 4, text: "4PM-8PM" },
  { value: 5, text: "8PM-Midnight" },
]

/* yes, this hook recreates a tiny portion of react-query, and frankly should move to that lib
if needs get even an iota more complex or if we want that sweet, sweet, client side cache */
export function useGames() {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    getGames().then(response => {
      if (response.status === 200) {
      // **Don't believe this is necessary since it is handled by backend prior to API endpoint**
      // setData(data.filter((x) => Date.parse(x.datetime) > new Date()));
        const data = response.data.map(game => {
          return {
            ...game,
            datetime: new Date(game.datetime),
            slot: Math.floor(new Date(game.datetime).getHours()/4),
            datetime_open_release: new Date(game.datetime_open_release),
            datetime_release: new Date(game.datetime_release)
          }
        }).sort((a, b) => {
          return a.datetime - b.datetime;
        });
        setData(data);
        setIsLoading(false);
      } else {
        setError(response);
        setIsLoading(false);
      }
    }).catch(err => {
      setError(err);
      setIsLoading(false);
    });
  }, []);
  
  return { 
    isLoading,
    data,
    error
  }
}