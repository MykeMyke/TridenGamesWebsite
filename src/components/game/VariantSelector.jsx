import { React } from "react";
import { useFormikContext } from "formik";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import { Select, MenuItem, Divider } from "@mui/material";

export default function VariantSelector(props) {
  const { values, errors, handleChange } = useFormikContext(); 

  return (
    <FormControl fullWidth error={!!errors.variant}>
      <InputLabel>Game Variant</InputLabel>
      <Select id="variant" name="variant" value={values.variant} label="Game Variant" onChange={handleChange}>
        <MenuItem value={"Resident AL"}>Resident AL</MenuItem>
        <MenuItem value={"Guest AL DM"}>Guest AL</MenuItem>
        <Divider fullWidth />
        <MenuItem value={"Epic AL"}>AL Epic</MenuItem>
        <MenuItem value={"Non-AL One Shot"}>Non-AL One Shot</MenuItem>
        <MenuItem value={"Campaign"}>Campaign</MenuItem>
      </Select>
      {!!errors.realm ? <FormHelperText>{errors.variant}</FormHelperText> : null}
    </FormControl>
  );
}
