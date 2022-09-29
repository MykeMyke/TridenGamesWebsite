import * as React from "react";
import { Fab } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";

export default function TridenverseModules(props) {
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // // const handleClick = (event) => {
  // //   setAnchorEl(event.currentTarget);
  // // };

  // // const handleClose = () => {
  // //   setAnchorEl(null);
  // // };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Fab
        // aria-describedby={id}
        variant="extended"
        // onClick={handleClick}
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
      {/* <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        BackdropProps={{ invisible: false }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            p: 1,
            maxWidth: "200px",
            pb: 0,
          }}
        >
          <strong>Content Warnings:</strong>
          <iframe src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSnNBURnnNqhhSHTEIBHilSeq9Q1Sh902UeaSV014IjzlTC6C7iEDzy_bVigvYrhtHWXsqH52L0vFhX/pubhtml?widget=true&amp;headers=false"></iframe>
        </Typography>
      </Popover> */}
    </div>
  );
}
