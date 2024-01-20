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
      if (gameData.players?.some(player => player.discord_name?.toLocaleLowerCase().includes(lowerName) || player.discord_id?.toString() === lowerName)) {
        cls += "filter-playing";
        text = "Playing";
      }
      else {
        const idx = gameData.standby?.findIndex(player => player.discord_name?.toLocaleLowerCase().includes(lowerName) || player.discord_id?.toString() === lowerName) + 1;
        if (idx > 0) {
          cls += "filter-waitlist";
            text = "Waitlist - Position " + (idx);
        }
      }
    }
  } else {
    cls += "filter-inactive";
  }
  return <Box className={cls}>{text}</Box>;
}

export default FilterMarker;
