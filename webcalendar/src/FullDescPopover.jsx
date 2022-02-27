import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function FullDescPopover(props) {
  const { desc } = props;

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
    <div>
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        size="small"
        sx={{ pt: 0.2, pb: 0, mb: 1.5 }}
      >
        Details
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
      >
        <Typography variant="body2" sx={{ p: 1 }}>
          Adventure Summary: {desc}
          {/* NEED TO READ MAPPED GAME.DESCRIPTIONFULL HERE */}
        </Typography>
      </Popover>
    </div>
  );
}
