import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";

export default function GameCreationPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [realm, setRealm] = useState("faerun");
  const [variant, setVariant] = useState("resDM");
  const [description, setDescription] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(6);
  const [tier, setTier] = useState(1);
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(4);
  const [warnings, setWarnings] = useState("");
  const [streaming, setStreamning] = useState(false);
  const [dateTime, setDateTime] = useState(null);
  const [dateTimePatreonRelease, setDateTimePatreonRelease] = useState(null);
  const [dateTimeOpenRelease, setDateTimeOpenRelease] = useState(null);
  const [length, setLength] = useState("4 Hours");
  const [ready, setReady] = useState(true);

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
      <TextField value={name} onChange={(e) => setName(e.target.value)} label="Game Name" />
      <TextField value={code} onChange={(e) => setCode(e.target.value)} label="Module Code" />
      <Button variant="outlined" disabled={!validateData}>
        Create Game
      </Button>
    </Box>
  );
}
