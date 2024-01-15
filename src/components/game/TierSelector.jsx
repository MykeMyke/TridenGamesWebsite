import { React } from "react";
import { useFormikContext } from "formik";
import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem, TextField } from "@mui/material";

export default function TierSelector(props) {
  const { values, handleChange, setFieldValue } = useFormikContext();
  return (
    <>
    <FormControl sx={{ minWidth: "8em" }}>
      <InputLabel>Tier of play</InputLabel>
        <Select value={values.tier || 1} label="Tier of play" onChange={async (evt) => {
          const tier = evt.target.value;
          let min;
          let max;
          switch (tier) {
            case 4:
              min = 17;
              max = 20;
              break;
            case 3:
              min = 11;
              max = 16;
              break;
            case 2:
              min = 5;
              max = 10;
              break;
            case 1:
            default:
              min = 1;
              max = 4;   
          }
          setFieldValue("tier", tier);
          setFieldValue("minLevel", min);
          setFieldValue("maxLevel", max);
          //setValues({ tier: tier, minLevel: min, maxLevel: max });
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
