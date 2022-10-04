import * as React from "react";
import { Fab } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export default function TridenverseModules(props) {
  return (
    <div>
      <Fab
        variant="extended"
        size="small"
        sx={{
          pt: 0.25,
          pb: 0,
          mt: 0.4,
          mb: 1.1,
          ml: 3,
          display: "flex",
          position: "fixed",
          justifyContent: "center",
          bottom: "1%",
          zIndex: 1000,
        }}
        color="secondary"
        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSnNBURnnNqhhSHTEIBHilSeq9Q1Sh902UeaSV014IjzlTC6C7iEDzy_bVigvYrhtHWXsqH52L0vFhX/pubhtml"
        target="_blank"
        rel="noreferrer"
      >
        <DescriptionIcon sx={{ mr: 1 }} />
        Adventures from Triden on DMsGuild
      </Fab>
    </div>
  );
}
