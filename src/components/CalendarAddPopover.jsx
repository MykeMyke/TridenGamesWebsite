import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import CalendarLink from "./CalendarLink";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function CalendarAddPopover(props) {
  const { game } = props;
  const desc = game.description;

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
        sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1, minWidth: "30px" }}
        color="secondary"
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
        <Grid container direction="column" sx={{ px: 1, py: 1 }}>
          <Typography variant="cardmain">Add game to Calendars:</Typography>
          <Divider
            variant="middle"
            sx={{
              mt: 1.2,
              mb: 0.6,
            }}
          />
          <CalendarLink game={game} />
          <Divider
            variant="middle"
            sx={{
              mt: 1.2,
              mb: 0.6,
            }}
          />
          <a href="" target="_blank" rel="noreferrer">
            Google (coming soon)
          </a>{" "}
        </Grid>
      </Popover>
    </div>
  );
}
