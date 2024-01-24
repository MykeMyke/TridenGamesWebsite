import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Divider,
  Typography,
  Button,
  ButtonGroup,
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import RankWidget from "../../components/user/RankWidget";
import { capitalise } from "../../utils/formatting";
import { toLocalString } from "../../utils/formatting";
import { checkTier } from "../../utils/tier";
import useUserStore from "../../stores/useUserStore";
import { useGames } from "../../api/games";
import KeyboardArrowUp from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import CalendarAddPopover from "../../components/CalendarAddPopover";
import CalendarGameControls from "../../components/CalendarGameControls";
import FilterMarker from "../../components/filterMarker";

function PlayerList({ players }) {
  return (
    <>
      {players.length ? (
        <List sx={{ listStyle: "decimal", ml: 4 }}>
          {players.map((player) => (
            <ListItem sx={{ display: "list-item" }}>
              <ListItemText>{player.discord_name}</ListItemText>
            </ListItem>
          ))}
        </List>
      ) : null}
    </>
  );
}

function MyGamesRow({ game }) {
  const user = useUserStore((s) => s.user);
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow>
        <TableCell colSpan={2} display="flex">
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 0.2 }}
            >
              <Typography color="text.primary" marginRight={3}>
                {toLocalString(game.datetime)}
              </Typography>
              <div>
                <CalendarGameControls game={game} />
                <CalendarAddPopover
                  game={game}
                  sx={{ height: "50%", pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1, minWidth: "30px" }}
                />
              </div>
            </Grid>
            <Grid item xs={1}>
              <IconButton valign="top" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
              </IconButton>
            </Grid>
            <Grid item xs={11}>
              <Typography marginRight={3}>{game.name}</Typography>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={7}>
              <Typography variant="subtitle2" color="text.secondary" marginRight={3}>
                {game.length} {checkTier(game.level_min, game.level_max)}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2" color="text.secondary">
                DM {game.dm_name}
              </Typography>
            </Grid>
            <Collapse in={open} unmountOnExit>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Typography fontWeight="bold">Description:</Typography> {game.description}
                </Grid>
                <Grid item xs={12}>
                  <Typography fontWeight="bold">Warnings:</Typography> {game.warnings}
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">
                    Playing {game.players.length} / {game.max_players}:
                  </Typography>
                  <PlayerList players={game.players} />
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Standby: {game.standby.length ? game.standby.length : 0} </Typography>
                  <PlayerList players={game.standby} />
                </Grid>
              </Grid>
            </Collapse>
            <Grid item container xs={12} sx={{ justifyContent: "center" }}>
              <FilterMarker
                activeName={user.discord_name}
                gameData={game}
                sx={{ px: 4, minWidth: 220, maxWidth: 400 }}
              />
            </Grid>
          </Grid>
        </TableCell>
      </TableRow>
    </>
  );
}
export default function MemberHome() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const { data: games, isLoading } = useGames();

  const myGames = useMemo(() => {
    const my = {
      playing: games.filter((game) => game.playing),
      standingBy: games.filter((game) => game.standingBy),
      dm: games.filter((game) => game.is_dm),
    };
    return my;
  }, [games]);

  return (
    <Container sx={{ margin: "auto", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Welcome {capitalise(user?.username)}</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.8,
            alignItems: "center",
          }}
        >
          <Typography>Roles:</Typography>
          {(user?.ranks || []).map((rank) => {
            return <RankWidget name={rank.name} />;
          })}
        </Box>

        <TableContainer>
          <TableHead>
            <TableCell />
            <TableCell rowSpan={12}>
              <Typography variant="h5">
                {games?.length ? games.length : isLoading ? " " : "No"} Upcoming Game{games.length == 1 ? "" : "s"}
              </Typography>
              <Typography variant="subtitle2">
                {games.length
                  ? ` (${myGames.playing.length} playing, ${myGames.standingBy.length} standby, ${myGames.dm.length} DM)`
                  : ""}{" "}
                {user.credit_available} / {user.credit_max} credit{user.credit_max === 1 ? "" : "s"}
              </Typography>
              <ButtonGroup variant="outlined" sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  aria-describedby="nav-calendar"
                  variant="contained"
                  size="small"
                  sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, minWidth: "30px" }}
                  color="secondary"
                  onClick={() => navigate(`/calendar`)}
                >
                  Calendar
                </Button>
                {user?.isDm ? (
                  <>
                    <Button
                      aria-describedby="nav-calendar"
                      variant="contained"
                      size="small"
                      color="secondary"
                      sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, minWidth: "30px" }}
                      onClick={() => navigate("/members/games")}
                    >
                      View DM games
                    </Button>
                    <Button
                      aria-describedby="nav-calendar"
                      variant="contained"
                      size="small"
                      sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, minWidth: "30px" }}
                      color="secondary"
                      onClick={() => navigate("/members/games/new")}
                    >
                      Create Game
                    </Button>
                  </>
                ) : null}
              </ButtonGroup>
            </TableCell>
          </TableHead>
          <Divider>Playing</Divider>
          {(myGames.playing.length && myGames.playing.map((game) => <MyGamesRow game={game} />)) || (
            <Typography textAlign="center" sx={{ padding: "2em", opacity: "0.6" }}>
              You are not confirmed playing in any upcoming games
            </Typography>
          )}
          <Divider>Waitlisted</Divider>
          {(myGames.standingBy.length && myGames.standingBy.map((game) => <MyGamesRow game={game} />)) || (
            <Typography textAlign="center" sx={{ padding: "2em", opacity: "0.6" }}>
              Not waitlisted for any upcoming games
            </Typography>
          )}
          <Divider>DMing</Divider>
          {(myGames.dm.length && myGames.dm.map((game) => <MyGamesRow game={game} />)) || (
            <Typography textAlign="center" sx={{ padding: "2em", opacity: "0.6" }}>
              You are not the DM for any upcoming games
            </Typography>
          )}
        </TableContainer>
      </Box>
    </Container>
  );
}
