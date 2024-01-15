import { React } from "react";
import { useFormikContext } from "formik";
import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem, Divider } from "@mui/material";

export default function Selector(props) {
  const { values, handleChange } = useFormikContext(); 

  return (
    <FormControl fullWidth>
      <InputLabel>Game Variant</InputLabel>
      <Select id="variant" name="variant" value={values.variant} label="Game Variant" onChange={handleChange}>
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
