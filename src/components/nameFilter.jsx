import { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

// function nameFilter({
//   setActiveName,
//   activeName,
//   setFiltered,
//   data,
// }) {
//   useEffect(() => {
//     if (activeName === 0) {
//       setFiltered(filtered);
//       return;
//     }
//   });
function nameFilter() {
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
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        sx={{ mr: 0.5 }}
      >
        Filter
      </Button>
      <Button variant="contained" color="secondary" size="large">
        Reset
      </Button>
    </Box>
  );
}

export default nameFilter;
