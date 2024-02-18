import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

import { Box, Button, Checkbox } from "@mui/material";

import DateTimeSelector from "./DateTimeSelector";

export default function TimeDetails(props) {
  const { values, setFieldValue } = useFormikContext();

  const [stagedRelease, setStagedRelease] = useState(true);

  const datetimeOpenRelease = values["datetime_open_release"];

  useEffect(() => {
    if (!stagedRelease) {
      setFieldValue("datetime_release", datetimeOpenRelease);
    }
  }, [stagedRelease, datetimeOpenRelease]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", margin: "0.8em 0", justifyContent: "space-around" }}>
      <Button variant="outlined" onClick={() => setStagedRelease(!stagedRelease)}>
        Staged Release
        <Checkbox checked={stagedRelease} />
      </Button>
      <DateTimeSelector disabled={!stagedRelease} label="Patreon Release" name="datetime_release" />
      <DateTimeSelector label="General Release" name="datetime_open_release" />
    </Box>
  );
}
