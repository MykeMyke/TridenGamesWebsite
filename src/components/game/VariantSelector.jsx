import { React } from "react";

import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem, Divider } from "@mui/material";

export default function VariantSelector(props) {
  const { value, setValue } = props;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Game Variant</InputLabel>
      <Select id="game-realm-select" value={value} label="Game Variant" onChange={handleChange}>
        <MenuItem value={"resAL"}>Resident AL</MenuItem>
        <MenuItem value={"guestAL"}>Guest AL</MenuItem>
        <Divider fullWidth />
        <MenuItem value={"epic"}>AL Epic</MenuItem>
        <MenuItem value={"oneshot"}>Non-AL One Shot</MenuItem>
        <MenuItem value={"campaign"}>Campaign</MenuItem>
      </Select>
    </FormControl>
  );
}
