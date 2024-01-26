import React, { useState } from "react";

import { Container, Typography, Divider, Box } from "@mui/material";
import { TextField, Button } from "@mui/material";

export default function DMProfile() {
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);
  const [dmName, setDMName] = useState("");
  const [dmDescription, setDMDescription] = useState("");
  const [dmRuleText, setDMRuleText] = useState("");
  const [dmMusterText, setDMMusterText] = useState("");

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="h3">DM Profile Settings</Typography>
        <Divider />

        <TextField value={dmName} onChange={(e) => setDMName(e.target.value)} placeholder="DM Delvemeister" label="DM Alias" />
        <TextField
          value={dmDescription}
          onChange={(e) => setDMDescription(e.target.value)}
          placeholder="A brief description of yourself as a DM"
          label="Description"
          multiline
          rows={3}
        />
        <TextField
          value={dmRuleText}
          onChange={(e) => setDMRuleText(e.target.value)}
          placeholder="Any rules you may wish to set for your games, you could for example demand all PC information is provided at least 24 hours before the game"
          label="Table Rules"
          multiline
          rows={4}
        />
        <TextField
          value={dmMusterText}
          onChange={(e) => setDMMusterText(e.target.value)}
          placeholder="Specify the text that Unseen Servant will post at the top of your mustering channels"
          label="Mustering text"
          multiline
          rows={4}
        />

        <Button variant="outlined" sx={{ width: "60%", margin: "auto" }}>
          {profileExists ? "Update" : "Create"}
        </Button>
      </Box>
    </Container>
  );
}
