import { Box } from "@mui/system";
import * as React from "react";

function FilterMarker({ gameData, activeName}) {
    let cls = "filter ";
    let text = "";
    if (activeName && activeName !== "" && !Array.isArray(activeName)) {
        if (gameData.dm_name && gameData.dm_name.toLocaleLowerCase().includes(activeName.toLocaleLowerCase())) {
            cls += "filter-dm";
            text = "Dungeon Master"
        } else if (gameData.players) {
            var count = 0;
            for (let player of gameData.players) {
                if (player.standby) count++;
                if ((player.discord_name && player.discord_name.toLocaleLowerCase().includes(activeName.toLocaleLowerCase())) 
                    || (player.discord_id && player.discord_id.toString().toLocaleLowerCase() == activeName.toLocaleLowerCase())) {
                    if (player.standby) {
                        cls += "filter-waitlist"
                        text = "Waitlist - Position " + count;
                    } else {
                        cls += "filter-playing"
                        text = "Playing"
                    }
                    break;
                }
            }
        }
    } else {
        cls += "filter-inactive";
    }
    return <Box className={cls}>{text}</Box>
}

export default FilterMarker;
