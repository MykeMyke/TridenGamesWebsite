import React from "react";
import { useFormikContext } from "formik";

import { Box, Button, Checkbox } from "@mui/material";

import DateTimeSelector from "./DateTimeSelector";
import { addWeeks } from "date-fns";

export default function TimeDetails(props) {
  const { values, setValues } = useFormikContext();
  return (
    <Box sx={{ display: "flex", flexDirection: "row", margin: "0.8em 0", justifyContent: "space-around" }}>
      <Button
        variant="outlined"
        onClick={() => {
          setValues({
            ...values,
            staged: !values.staged,
            datetime_release: values.staged ? null : addWeeks(values.datetime, -2),
            datetime_open_release: values.staged ? values.datetime_open_release : addWeeks(values.datetime, -1),
          });
        }}
      >
        Staged Release
        <Checkbox checked={values.staged || false} />
      </Button>
      <DateTimeSelector disabled={!values.staged} label="Patreon Release" name="datetime_release" />
      <DateTimeSelector label="General Release" name="datetime_open_release" />
    </Box>
  );
}
