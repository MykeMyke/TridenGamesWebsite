import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Box, Typography, Button, ButtonGroup } from "@mui/material";

import RankWidget from "../../components/user/RankWidget";
import { capitalise } from "../../utils/formatting";
import { hasDMRank } from "../../utils/ranks";
import { UserContext } from "../../App";

export default function MemberHome() {
  const navigate = useNavigate();
  const { user, isLoading, login, logout } = useContext(UserContext);

  return (
    <Container sx={{ margin: "auto", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Typography>Welcome {capitalise(user?.username)}</Typography>
        {hasDMRank(user?.ranks || []) && (
          <ButtonGroup>
            <Button variant="outlined" onClick={() => navigate("/members/games")}>
              View my games
            </Button>
            <Button variant="outlined" onClick={() => navigate("/members/games/new")}>
              Create new game
            </Button>
          </ButtonGroup>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.8,
          alignItems: "center",
        }}
      >
        <Typography>Your roles:</Typography>
        {(user?.ranks || []).map((rank) => {
          return <RankWidget name={rank.name} />;
        })}
      </Box>
    </Container>
  );
}
