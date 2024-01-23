import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import CalendarLink from "./CalendarLink";

export default function CalendarAddPopover(props) {
  const { game } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        size="small"
        sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1, minWidth: "30px" }}
        color="secondary"
        {...props}
      >
        📆
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        BackdropProps={{ invisible: false }}
      >
        <CalendarLink game={game} />
      </Popover>
    </>
  );
}
