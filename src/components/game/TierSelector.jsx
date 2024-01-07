import { React } from "react";

import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem, Divider } from "@mui/material";

export default function TierSelector(props) {
  const { value, setValue } = props;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormControl sx={{ minWidth: "8em" }}>
      <InputLabel>Tier of play</InputLabel>
      <Select id="game-tier-select" value={value} label="Tier of play" onChange={handleChange}>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
}
