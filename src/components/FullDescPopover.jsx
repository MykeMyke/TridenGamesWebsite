import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function FullDescPopover(props) {
  const { game } = props;
  const desc = game.description;
  const warnings = game.warnings;

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
        sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
        color="secondary"
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
        BackdropProps={{ invisible: false }}
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
        </Typography>
        <Typography
          variant="body2"
          sx={{
            p: 1,
            maxWidth: "200px",
          }}
        >
          {warnings}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            p: 1,
            maxWidth: "200px",
            pb: 0,
          }}
        >
          <strong>Adventure Summary:</strong>
        </Typography>
        <Typography
          variant="body2"
          sx={{
            p: 1,
            maxWidth: "200px",
          }}
        >
          {desc}
        </Typography>
      </Popover>
    </div>
  );
}
