import { React } from "react";
import { useFormikContext } from "formik";
import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem, TextField } from "@mui/material";

export default function TierSelector(props) {
  const { values, handleChange, setValues } = useFormikContext();
  
  return (
    <>
    <FormControl sx={{ minWidth: "8em" }}>
      <InputLabel>Tier of play</InputLabel>
        <Select value={values.tier || 1} label="Tier of play" onChange={(evt) => {
          const tier = evt.target.value;
          let minLevel;
          let maxLevel;
          switch (tier) {
            case 4:
              minLevel = 17;
              maxLevel = 20;
              break;
            case 3:
              minLevel = 11;
              maxLevel = 16;
              break;
            case 2:
              minLevel = 5;
              maxLevel = 10;
              break;
            case 1:
            default:
              minLevel = 1;
              maxLevel = 4;   
          }
          setValues({ ...values, tier, minLevel, maxLevel }); 
        }}>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
      </FormControl>
      <TextField
        name="minLevel"
        value={values.minLevel || 1}
        onChange={handleChange}
        label="Min Level"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />      <TextField
        name="maxLevel"
        value={values.maxLevel || 4}
        onChange={handleChange}
        label="Max Level"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      </>
  );
}
