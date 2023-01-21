import { Box } from "@mui/system";
import * as React from "react";

function FilterMarker({ gameData, activeName }) {
  let cls = "filter ";
  let text = "";
  if (activeName && activeName !== "" && !Array.isArray(activeName)) {
    const lowerName = activeName.toLocaleLowerCase();
    if (
      gameData?.dm_name?.toLocaleLowerCase()
        .includes(lowerName)
    ) {
      cls += "filter-dm";
      text = "Dungeon Master";
    } else if (gameData.players) {
      const idx = gameData.players.findIndex(player => player.discord_name?.toLocaleLowerCase().includes(lowerName) || player.discord_id?.toString() === lowerName) + 1;
      if (idx > 0) {
        if (idx > gameData.max_players) {
            cls += "filter-waitlist";
            text = "Waitlist - Position " + (idx - gameData.max_players);
        } else {
            cls += "filter-playing";
            text = "Playing";
        }
      }
    }
  } else {
    cls += "filter-inactive";
  }
  return <Box className={cls}>{text}</Box>;
}

export default FilterMarker;
