import { React } from "react";

import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem, Divider } from "@mui/material";

export default function RealmSelector(props) {
  const { value, setValue } = props;

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>Realm</InputLabel>
      <Select id="game-realm-select" value={value} label="Realm" onChange={handleChange}>
        <MenuItem value={"faerun"}>Forgotten Realms</MenuItem>
        <MenuItem value={"eberron"}>Ebberon</MenuItem>
        <MenuItem value={"ravnica"}>Ravnica</MenuItem>
        <MenuItem value={"misthunters"}>Misthunters</MenuItem>
        <MenuItem value={"strixhaven"}>Strixhaven</MenuItem>
        <MenuItem value={"wildemount"}>Wildemount</MenuItem>
        <Divider fullWidth />
        <MenuItem value={"other"}>Other Setting</MenuItem>
      </Select>
    </FormControl>
  );
}
