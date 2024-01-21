import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button, ButtonGroup } from "@mui/material";
import RankWidget from "../../components/user/RankWidget";
import { capitalise } from "../../utils/formatting";
import useUserStore from "../../stores/useUserStore";

export default function MemberHome() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);

  return (
    <Container sx={{ margin: "auto", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Typography variant="h2">Welcome {capitalise(user?.username)}</Typography>
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
        <Typography variant="h4" sx={{ mt: 2 }}>Player Options</Typography>
        <Typography>
          You have {user.credit_available} of {user.credit_max} available game credit{user.credit_max === 1 ? "" : "s"}
          <Button
            aria-describedby="nav-calendar"
            variant="contained"
            size="small"
            sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, ml: 4, minWidth: "30px" }}
            color="secondary"
            onClick={() => navigate(`/calendar`)}>View on Calendar</Button>
        </Typography>
        {user?.isDm ? (
          <>
          <Typography variant="h4" sx={{ mt: 2 }}>Dungeon Master Options</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2, justifyContent: "center" }}>
            <ButtonGroup>
              <Button
                aria-describedby="nav-calendar"
                variant="contained"
                size="small"
                sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mx: 4, minWidth: "30px" }}
                color="secondary"
                onClick={() => navigate("/members/games")}>
                View my games
              </Button>
              <Button
                aria-describedby="nav-calendar"
                variant="contained"
                size="small"
                sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, ml: 4, minWidth: "30px" }}
                color="secondary"
                onClick={() => navigate("/members/games/new")}>
                Create new game
              </Button>
            </ButtonGroup>
            </Box>
            </>
        ) : null}
      </Box>
    </Container>
  );
}
