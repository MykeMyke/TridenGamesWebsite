import React, { useState } from "react";

import { Avatar, Menu, MenuItem } from "@mui/material";

export default function AuthButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  const discordAuth = () => {
    const url =
      "https://unseen-servant.digitaldemiplane.com/discord_auth/login/";

    window.open(url, "_blank", "noreferrer");
    closeMenu();
  };

  return (
    <React.Fragment>
      <Avatar onClick={openMenu} />
      <Menu
        id="auth-menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={discordAuth}>Login via discord</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
