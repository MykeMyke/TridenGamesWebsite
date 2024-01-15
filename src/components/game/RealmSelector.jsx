import { React } from "react";
import { useFormikContext } from "formik";
import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem, Divider } from "@mui/material";

export default function RealmSelector(props) {
  const {values, handleChange} = useFormikContext();

  return (
    <FormControl fullWidth>
      <InputLabel>Realm</InputLabel>
      <Select id="realm" name="realm" value={values.realm} label="Realm" onChange={handleChange}>
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
