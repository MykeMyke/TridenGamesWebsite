import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function NameFilter({ setActiveName, activeName, setFiltered, data }) {
  const handleChange = (event) => {
    setActiveName(event.target.value);
  };

  useEffect(() => {
    if (!activeName || activeName === "" || Array.isArray(activeName)) {
      setFiltered(data);
      return;
    }
    const filtered = data.filter(
      (gameData) =>
        gameData &&
        ((gameData.players &&
          gameData.players.some(
            (player) =>
              player &&
              ((player.discord_name &&
                player.discord_name.includes(activeName)) ||
                (player.discord_id && player.discord_id === activeName))
          )) ||
          (gameData.dm_name && gameData.dm_name.includes(activeName)))
    );
    setFiltered(filtered);
  }, [activeName, data, setFiltered]);

  // function nameFilter() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        mb: 2,
        ml: 2,
      }}
    >
      <TextField
        className="Name-Filter"
        id="nameFilter"
        label="Filter by Discord Name"
        helperText="Discord Name without #xxxx or Discord ID"
        variant="outlined"
        size="small"
        margin="dense"
        value={activeName}
        onChange={handleChange}
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => {
          setActiveName("");
        }}
      >
        Reset
      </Button>
    </Box>
  );
}

export default NameFilter;
