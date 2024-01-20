import * as React from "react";

import { Box } from "@mui/system";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import FullDescPopover from "./FullDescPopover";
import CalendarAddPopover from "./CalendarAddPopover";
import { toLocalString } from "../utils/formatting";
import { checkTier } from "../utils/tier";
import FilterMarker from "./filterMarker";
import { useNavigate } from "react-router-dom";
import GameCardActions from "./game/GameCardActions";

const Players = ({ gameKey, players }) => {
  if (players && players.length > 0) {
    return (
      <ol className="mouseover-list">
        {players.map((player) => (
          <li key={`${gameKey}_pname_${player.discord_name}`}>
            {player.discord_name}
          </li>
        ))}
      </ol>
    );
  } else {
    return "None yet - just waiting for you to sign up!";
  }
};

const SKELETON_SX = { maxWidth: 450, width: "100%" };

const Controls = ({ game }) => {
  const navigate = useNavigate();
    if (game.is_dm) {
      return (
        <Button
          aria-describedby={`dm-edit${game.id}`}
          variant="contained"
          size="small"
          sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1, minWidth: "30px" }}
          color="secondary"
          onClick={() => navigate(`/members/games/edit/${game.id}`)}>✏️</Button>
      )
  }
  return null;
}
const Game = ({ props, activeName, isLoading, joinGame, isJoining, dropGame, isDropping }) => {
  const {
    module,
    name,
    datetime,
    length,
    max_players,
    dm_name,
    level_min,
    level_max,
    datetime_release,
    datetime_open_release,
    players,
    standby,
  } = props;

  return (
    <Card raised={true} sx={{ maxWidth: 450 }}>
      <CardContent sx={{ pt: 0.75, pb: 0.2, "&:last-child": { pb: 0 } }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          {isLoading ? (
            <Skeleton height={74} sx={SKELETON_SX} />
          ) : (
            <>
              <Box>
                <Typography
                  variant="cardmain"
                  color="text.primary"
                  marginRight={3}
                >
                  {toLocalString(datetime)}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {length}
                </Typography>
              </Box>
            </>
          )}
          {isLoading ? (
            <Skeleton height={22} sx={SKELETON_SX} />
          ) : (
            <>
              <Typography
                variant="subtitle"
                color="text.primary"
                sx={{ mr: 1 }}
              >
                {module}
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.primary"
                display="block"
              >
                {checkTier(level_min, level_max)}
              </Typography>
            </>
          )}
        </Grid>
        <Divider
          variant="middle"
          sx={{
            my: 0.6,
          }}
        />
        {isLoading ? (
          <Skeleton height={26} sx={SKELETON_SX} />
        ) : (
          <Typography variant="cardmain" color="text.primary">
            {name}
          </Typography>
        )}
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: 0.2 }}
        >
          {isLoading ? (
            <Skeleton height={36} sx={SKELETON_SX} />
          ) : (
            <>
              <FullDescPopover game={props} />{" "}
              <CalendarAddPopover game={props} />
              <Controls game={props}/>
            </>
          )}
        </Grid>
        <Divider variant="middle" sx={{ mb: 1 }} />
        {isLoading ? (
          <Skeleton height={22} sx={SKELETON_SX} />
        ) : (
          <Typography variant="subtitle2" color="text.primary" display="block">
            DM: {dm_name}
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ py: 0 }}>
        {isLoading ? (
          <Skeleton height={72} sx={SKELETON_SX} />
        ) : (
          <Grid container direction="row" justifyContent="space-between">
            <Tooltip
              title={
                <Players
                  gameKey={`${dm_name}_${datetime}_playing`}
                  players={players}
                />
              }
              placement="top-start"
            >
              <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.primary">
                  Players
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {players.length} / {max_players}
                </Typography>
              </Box>
            </Tooltip>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Tooltip
              title={
                <Players
                  gameKey={`${dm_name}_${datetime}_waitlisted`}
                  players={standby}
                />
              }
              placement="top-start"
            >
              <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.primary">
                  Waitlist
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {standby.length}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
        )}
      </CardActions>
      <CardActions sx={{ pt: 0.2 }} style={{ justifyContent: "center" }}>
        {isLoading ? null : (
          <Typography variant="suffix" color="text.secondary" alignItems="center" align={"center"}>
            <GameCardActions joinGame={joinGame} isJoining={isJoining} dropGame={dropGame} {...props} />
          </Typography>
        )}
      </CardActions>
      <FilterMarker activeName={activeName} gameData={props}></FilterMarker>
    </Card>
  );
};

export default Game;
