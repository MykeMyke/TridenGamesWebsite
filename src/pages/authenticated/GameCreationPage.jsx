import { useState } from "react";

import { Box, TextField, Button } from "@mui/material";

import RealmSelector from "../../components/game/RealmSelector";
import VariantSelector from "../../components/game/VariantSelector";
import TierSelector from "../../components/game/TierSelector";

export default function GameCreationPage() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [realm, setRealm] = useState("faerun");
  const [variant, setVariant] = useState("resAL");
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
        flexDirection: "row wrap",
        alignItems: "center",
        gap: 1,
      }}
    >
      <TextField value={name} onChange={(e) => setName(e.target.value)} label="Game Name" sx={{ minWidth: "16em" }} />
      <TextField value={code} onChange={(e) => setCode(e.target.value)} label="Module Code" sx={{ minWidth: "16em" }} />
      <Box sx={{ minWidth: "16em" }}>
        <RealmSelector value={realm} setValue={setRealm} />
        <VariantSelector id="game-variant" value={variant} setValue={setVariant} />
      </Box>
      <TextField
        id="game-description"
        multiline
        fullWidth
        minRows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
      />
      <TextField
        id="game-max-players"
        value={maxPlayers}
        onChange={(e) => setMaxPlayers(e.target.value)}
        label="Players"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TierSelector value={tier} setValue={setTier} />
      <Button variant="outlined" disabled={!validateData}>
        Create Game
      </Button>
    </Box>
  );
}
