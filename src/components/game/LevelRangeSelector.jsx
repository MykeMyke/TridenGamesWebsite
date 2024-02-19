import React from "react";
import { useFormikContext } from "formik";

import { Box, TextField } from "@mui/material";
import { minToTier } from "../../api/games";

export default function LevelRangeSelector(props) {
  const { values, setValues, errors } = useFormikContext();

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
      <TextField
        sx={{ width: "6em" }}
        name="level_min"
        value={values.level_min || 1}
        error={!!errors.level_min}
        helperText={errors.level_min}
        onChange={(evt) => {
          setValues({
            ...values,
            level_min: evt.target.value,
            level_max: evt.target.value > values.level_min ? evt.target.value : values.level_max,
            tier: minToTier(evt.target.value),
          });
        }}
        label="Min Level"
        type="number"
        inputProps={{ min: 1, max: 20 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        name="level_max"
        sx={{ width: "6em" }}
        value={values.level_max || 4}
        error={!!errors.level_max}
        helperText={errors.level_max}
        onChange={(evt) => {
          setValues({
            ...values,
            level_max: evt.target.value,
            level_min: evt.target.value < values.level_min ? evt.target.value : values.level_min,
            tier: evt.target.value < values.level_min ? minToTier(evt.target.value) : values.tier,
          });
        }}
        label="Max Level"
        type="number"
        inputProps={{ min: 1, max: 20 }}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}
