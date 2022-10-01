import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogActions } from "@mui/material";
import useLocalStorage, { deleteFromStorage, writeStorage } from "@rehooks/local-storage";

// the prefix serves as a namespace so we will not delete other keys, unless they pick this name
// leave this the same unless you have a reason to change this
const SHOW_KEY_PREFIX = "_showTridenHomePopup_";

//make this whatever you want to identify the *current* popup.  Can be number, a string
const CURRENT_KEY_NAME = "1"

/**
 * Get the key in localStorage to see if we want to show/hide the popup
 * @returns the name of a key that can be read from/written to localStorage
 */
const currentPopupKey = () => {
  return `${SHOW_KEY_PREFIX}${CURRENT_KEY_NAME}`
}

/**
 * See if this key can be deleted in our cleanup loop.
 * @param {return} key 
 * @returns true if this key can be safely deleted, false otherwise
 */
const canBeDeleted = (key) => {
  //why use indexOf instead of startsWith?  Because I have a soft spot for IE11
  return key.indexOf(SHOW_KEY_PREFIX) === 0 && key !== currentPopupKey();
}

const handleClose = () => {
  //write false to local storage, so this browser doesnt see it again
  writeStorage(currentPopupKey(), false);
  //this is an optional cleanup loop just to be a good citizen.  it destroys ALL localStrage entries that are not
  // our key, so we do not store an increasing number of keys in the browser.  Practically speaking, triden will not
  // be storing enough keys to cause anybody problems, so you can omit if extra keys does not bother you.
  // if you start to use localStorage elsewhere, you will need o make this more precise to delete only
  // popup releated keys
  Object.entries(localStorage).forEach(([key]) => {
    if (canBeDeleted(key)) {
      deleteFromStorage(key);
    }
  });
}

export default function OnLoadPopUp() {
  //this key is true/false.  you could also store something more complicated if you needed to make a decision
  const [showPopup] = useLocalStorage(currentPopupKey(), true);

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
