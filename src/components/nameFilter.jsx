import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function NameFilter({ setActiveName, activeName, setFiltered, data }) {
  useEffect(() => {
    if (activeName === "") {
      setFiltered(data);
      return;
    }
    const filtered = data.filter((gameData) =>
      gameData.Players.includes(activeName)
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
        helperText="Discord Name without #xxxx"
        variant="outlined"
        size="small"
        margin="dense"
        value={activeName}
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ mr: 0.5 }}
        onClick={() => {
          setActiveName(activeName);
        }}
      >
        Filter
      </Button>
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
