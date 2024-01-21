import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";

import { Box, Button, IconButton, Tooltip, Checkbox } from "@mui/material";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import DateTimeSelector from "./DateTimeSelector";

export default function TimeDetails(props) {
  const { values, setFieldValue } = useFormikContext();

  const [showDetail, setShowDetail] = useState(false);
  const [stagedRelease, setStagedRelease] = useState(true);

  const datetimeOpenRelease = values["datetime_open_release"];

  useEffect(() => {
    if (!stagedRelease) {
      setFieldValue("datetime_release", datetimeOpenRelease);
    }
  }, [stagedRelease, datetimeOpenRelease]);

  return (
    <Box sx={{ display: "flex", flexDirection: "row", margin: "0.8em 0", justifyContent: "space-around" }}>
      <Tooltip title="Show or hide release time details">
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
      <Button
        disabled={!showDetail}
        sx={{ opacity: showDetail ? 1 : 0.2 }}
        variant="outlined"
        onClick={() => setStagedRelease(!stagedRelease)}
      >
        Staged Release
        <Checkbox disabled={!showDetail} checked={stagedRelease} sx={{ opacity: showDetail ? 1 : 0.2 }} />
      </Button>
      <DateTimeSelector
        disabled={!showDetail || !stagedRelease}
        sx={{ opacity: showDetail ? 1 : 0.2 }}
        label="Patreon Release"
        name="datetime_release"
      />
      <DateTimeSelector
        disabled={!showDetail}
        sx={{ opacity: showDetail ? 1 : 0.2 }}
        label="General Release"
        name="datetime_open_release"
      />
    </Box>
  );
}
