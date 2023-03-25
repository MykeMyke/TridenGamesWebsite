import { Container, Box, Typography, Button } from "@mui/material";

import userDataStore from "../datastore/userdata";
import RankWidget from "../components/user/RankWidget";
import { hasDMRank } from "../utils/ranks";

export default function MemberLandingPage() {
  const [username, ranks] = userDataStore((s) => [s.username, s.ranks]);

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
        <Typography>Welcome {username}</Typography>
        {hasDMRank(ranks) && (
          <Button variant="outlined">Create new game</Button>
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
        {ranks.map((rank) => {
          return <RankWidget name={rank.name} />;
        })}
      </Box>
    </Container>
  );
}
