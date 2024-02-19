import React from "react";
import { useFormikContext } from "formik";
import { FormControl, InputLabel } from "@mui/material";
import { Select, MenuItem } from "@mui/material";

export default function TierSelector(props) {
  const { values, setValues } = useFormikContext();

  return (
    <FormControl>
      <InputLabel>Tier of play</InputLabel>
      <Select
        sx={{ width: "6em" }}
        value={values.tier || 1}
        label="Tier of play"
        onChange={(evt) => {
          const tier = evt.target.value;
          let level_min;
          let level_max;
          switch (tier) {
            case 4:
              level_min = 17;
              level_max = 20;
              break;
            case 3:
              level_min = 11;
              level_max = 16;
              break;
            case 2:
              level_min = 5;
              level_max = 10;
              break;
            case 1:
            default:
              level_min = 1;
              level_max = 4;
          }
          setValues({ ...values, tier, level_min, level_max });
        }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
      </Select>
    </FormControl>
  );
}
