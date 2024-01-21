import { useState } from "react";
import { useNavigate } from "react-router-dom";
import stringAvatar from "../../utils/stringAvatar";
import { Avatar, Menu, MenuItem } from "@mui/material";
import useUserStore from "../../stores/useUserStore";
import { useShallow } from "zustand/react/shallow";

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
    <>
      <MenuItem onClick={() => navigate("/members")}>View member area</MenuItem>
      <MenuItem
        onClick={() => {
          closeMenu();
          logout();
        }}
      >
        Logout
      </MenuItem>
    </>
  );
}
export default function AuthButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, login, logout] = useUserStore(useShallow((s) => [s.user, s.login, s.logout]))
  
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
        {user?.loggedIn ? (
          <LoggedInMenu closeMenu={closeMenu} logout={logout} />
        ) : (
          <MenuItem onClick={login}>Login via discord</MenuItem>
        )}
      </Menu>
    </>
  );
}
