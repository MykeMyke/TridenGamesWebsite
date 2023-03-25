import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";

export default function GameCreationPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const validateData = () => {
    if (name && code) return true;
    return false;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Game Name"
      />
      <TextField
        value={code}
        onChange={(e) => setCode(e.target.value)}
        label="Module Code"
      />
      <Button variant="outlined" disabled={!validateData}>
        Create Game
      </Button>
    </Box>
  );
}
