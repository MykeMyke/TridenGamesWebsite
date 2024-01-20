import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Menu, MenuItem, Typography } from "@mui/material";

import stringAvatar from "../../utils/stringAvatar";
import { UserContext } from "../../App";

/**
 * A separate function for the mutiple item logged in menu, because MUI complains if this
 * is directly under Menu
 * @param closeMenu the close function
 * @param logout the logout function
 * @returns
 */
function LoggedInMenu({ closeMenu, logout }) {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <MenuItem onClick={() => navigate("/members")}>View member area</MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          logout();
        }}
      >
        Logout
      </MenuItem>
    </React.Fragment>
  );
}
export default function AuthButton() {
  const { user, login, logout } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Avatar onClick={openMenu} {...stringAvatar(user?.username || "")} />
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
        {user?.loggedIn ? (
          <LoggedInMenu closeMenu={closeMenu} logout={logout} />
        ) : (
          <MenuItem onClick={login}>Login via discord</MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
}
