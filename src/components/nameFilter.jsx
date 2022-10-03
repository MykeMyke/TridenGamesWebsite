import { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

function NameFilter({ onChange }) {
  const [activeName, setActiveName] = useState('');
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
        onChange={(evt) => {
          setActiveName(evt.target.value);
          onChange(evt.target.value);
        }}
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={(evt) => {
          setActiveName('');
          onChange("");
          evt.preventDefault();
        }}
      >
        Reset
      </Button>
    </Box>
  );
}

export default NameFilter;
