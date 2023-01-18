import { useState, useEffect } from "react";
import axios from "axios";

function getGames() {
  let url = "https://unseen-servant.digitaldemiplane.com/api/games/";
  return axios.get(url);
}

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
        setData(response.data.sort((a, b) => {
          return new Date(a.datetime) - new Date(b.datetime);
        }));
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