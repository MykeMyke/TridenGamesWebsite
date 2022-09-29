import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function OnLoadPopUp() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        href="/calendar"
      >
        <DialogTitle id="alert-dialog-title">{"Want the TLDR?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <strong>We do D&D 5E!</strong> Join us on{" "}
            <a
              href="https://discord.gg/JDB6BYTK9T"
              target="_blank"
              rel="noreferrer"
            >
              Discord
            </a>
          </DialogContentText>
          <DialogContentText id="alert-dialog-players" sx={{ mt: 3 }}>
            <strong>For Players:</strong> Here's our{" "}
            <a href="/calendar">Games Calendar</a> for Adventurer's League
          </DialogContentText>
          <DialogContentText id="alert-dialog-dms" sx={{ mt: 1 }}>
            <strong>For DMs:</strong> If you're looking for some awesome new
            modules to run you can check out our{" "}
            <a
              href="https://docs.google.com/spreadsheets/d/e/2PACX-1vSnNBURnnNqhhSHTEIBHilSeq9Q1Sh902UeaSV014IjzlTC6C7iEDzy_bVigvYrhtHWXsqH52L0vFhX/pubhtml"
              target="_blank"
              rel="noreferrer"
            >
              DungeonCraft Adventures
            </a>
          </DialogContentText>
          <DialogContentText id="alert-dialog-writers" sx={{ mt: 1 }}>
            <strong>For Writers:</strong> We have loads of support to help you
            get writing. Check out what's available in the{" "}
            <a href="/tridenverse">Tridenverse</a>.
          </DialogContentText>
          <DialogContentText id="alert-dialog-more" sx={{ mt: 3 }}>
            <strong>Looking for something else?</strong> There's lots more to
            explore on the website! Go find your adventure...
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
