import React, { useContext, useState } from "react";
import { Avatar, Menu, MenuItem } from "@mui/material";
import stringAvatar from "../../utils/stringAvatar";
import { UserContext } from "../../App";

export default function AuthButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, isLoading, login, logout } = useContext(UserContext);
  
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  
  return (
    <>
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
        {user?.loggedIn ? <MenuItem onClick={() => {
          closeMenu();
          logout()
        }
        }>Logout</MenuItem>
        : <MenuItem onClick={login}>Login via discord</MenuItem>}
      </Menu>
    </>
  );
}
