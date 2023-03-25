import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getUserDetails } from "../../api/auth";
import userDataStore from "../../datastore/userdata";

export function DiscordAuthDone() {
  const navigate = useNavigate();
  const setData = userDataStore((s) => setData);

  useEffect(() => {
    getUserDetails().then((response) => {
      console.log(response);
      setData(response.data);
    });

    navigate("/members");
  }, [navigate, setData]);

  return null;
}
