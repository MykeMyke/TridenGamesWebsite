import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions } from "@mui/material";
import useLocalStorage, { deleteFromStorage, writeStorage } from "@rehooks/local-storage";

//this is the key for the current rev of the popup.  If you have something else you want to show,
// e.g. you want a popup announcing an epic, change this key announce an epic, change ths key
const SHOW_KEY_NAME = "showPopup0";
const handleClose = () => {
  //write false to local storage, so this browser doesnt see it again
  writeStorage(SHOW_KEY_NAME, false);
  //this is an optional cleanup loop just to be a good citizen.  it destroys ALL localStrage entries that are not
  // our key, so we do not store an increasing number of keys in the browser.  Practically speaking, triden will not
  // be storing enough keys to cause anybody problems, so you can omit if extra keys does not bother you.
  // if you start to use localStorage elsewhere, you will need o make this more precise to delete only
  // popup releated keys
  Object.entries(localStorage).forEach(([key]) => {
    if (key !== SHOW_KEY_NAME) {
      deleteFromStorage(key);
    }
  })
}

export default function OnLoadPopUp() {
  //this key is true/false.  you could also store something more complicated if you needed to make a decision
  const [showPopup] = useLocalStorage(SHOW_KEY_NAME, true);

  return (
    <div>
      <Dialog
        open={showPopup}
        // for heck of it put in button to close to make it explicit onClose={handleClose}
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
            {/* put onClick={handleClose} if you want clicking this to dismiss the popup, too*/}
            <a href="/tridenverse">Tridenverse</a>.
          </DialogContentText>
          <DialogContentText id="alert-dialog-more" sx={{ mt: 3 }}>
            <strong>Looking for something else?</strong> There's lots more to
            explore on the website! Go find your adventure...
          </DialogContentText>
          <DialogActions>
            <Button variant="contained"
              size="medium"
              // sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
              color="secondary" onClick={handleClose}>Got it</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
}
