import React, { useState } from "react";
import { useFormikContext } from "formik";

import { FormControl, InputLabel, Box, Tooltip } from "@mui/material";
import { Select, MenuItem, TextField, IconButton } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function LevelRangeSelector(props) {
  const { values, handleChange, setValues } = useFormikContext();

  const [showDetail, setShowDetail] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Box>
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
      </Box>
      <Tooltip title="Show or hide level range details">
        {(showDetail && (
          <IconButton onClick={() => setShowDetail(false)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
        )) || (
          <IconButton onClick={() => setShowDetail(true)}>
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </Tooltip>
      <TextField
        disabled={!showDetail}
        sx={{ width: "6em", opacity: showDetail ? 1 : 0.2 }}
        name="level_min"
        value={values.level_min || 1}
        onChange={handleChange}
        label="Min Level"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        disabled={!showDetail}
        name="level_max"
        sx={{ width: "6em", opacity: showDetail ? 1 : 0.2 }}
        value={values.level_max || 4}
        onChange={handleChange}
        label="Max Level"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Box>
  );
}
