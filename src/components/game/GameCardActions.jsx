import * as React from "react";

import { Button } from "@mui/material";

import { ReleaseDate } from "../../utils/releasedate";
import useUserStore from "../../stores/useUserStore";
import LoginButton from "../authentication/LoginButton";

export default function GameCardActions({
  id,
  is_dm,
  name,
  datetime_release,
  datetime_open_release,
  playing,
  standingBy,
  joinGame,
  isJoining,
  dropGame,
}) {
  const user = useUserStore((s) => s.user);
  const now = new Date();
  if (!user?.loggedIn) {
    return ReleaseDate(datetime_release, datetime_open_release);
  }

  if (!is_dm) {
    if (playing || standingBy) {
      return (
        <Button
          aria-describedby={`drop-${id}`}
          variant="contained"
          disabled={isJoining}
          onClick={() => dropGame({ id, name })}
          size="small"
          sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
          color="secondary"
        >
          Drop Now
        </Button>
      );
    }
    if (
      (user.patreon && datetime_release?.getTime() < now.getTime()) ||
      datetime_open_release.getTime() < now.getTime()
    ) {
      return (
        <Button
          aria-describedby={`join-${id}`}
          variant="contained"
          disabled={isJoining}
          onClick={() => joinGame({ id, name })}
          size="small"
          sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
          color="secondary"
        >
          Join Now
        </Button>
      );
    }
  }
  return ReleaseDate(datetime_release, datetime_open_release);
}
