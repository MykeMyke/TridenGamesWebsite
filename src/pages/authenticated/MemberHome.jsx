import { useContext } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import LoginButton from "../../components/authentication/RequireAuth";
import RankWidget from "../../components/user/RankWidget";
import { hasDMRank } from "../../utils/ranks";
import { UserContext } from "../../App";

export default function MemberHome() {

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
        <Typography>Welcome {user?.username}</Typography>
        {hasDMRank(user?.ranks || []) && (
          <Button variant="outlined" onClick={() => navigate("/game/create")}>
            Create new game
          </Button>
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
