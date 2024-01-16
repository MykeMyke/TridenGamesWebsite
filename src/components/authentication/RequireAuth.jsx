import React, { useContext, useState } from "react";
import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import { UserContext } from "../../App";

export default function RequireAuth({ children }) {
  const { user, isLoading, login, logout } = useContext(UserContext);
  
  if (isLoading) {
    return <h2>Loading...</h2>
  }
  if (user?.loggedIn) {
    return children;
  }
  return <h2>You are not logged in.  Why not <Button onClick={login}>Join us</Button></h2>
}
