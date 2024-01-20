import React, { useContext } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { UserContext } from "../../App";

function RequireAuthFragment({ title, subtitle }) {
  return (
    <Container sx={{ margin: "auto", width: "100%" }}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <Typography
        variant="h4"
        color="text.primary"
        sx={{ mb: 1, textAlign: "center" }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography
          color="text.primary"
          sx={{ mb: 1, textAlign: "center" }}
        >
          {subtitle}
        </Typography>
      ): null}
    </Box>
    </Container>
  )
}

export default function RequireAuth({ requireDm = false, children }) {
  const { user, isLoading, login } = useContext(UserContext);

  if (isLoading) {
    return <RequireAuthFragment title="Loading..."/>
  }
  if (user?.loggedIn) {
    if (!requireDm) {
      return children;
    }
    if (user.isDm) {
      return children;
    } else {
      return <RequireAuthFragment title="Access Denied" subtitle="Only Dungeon Masters May Access This Page"/>
    }
  }

  return <RequireAuthFragment title="Access Denied" subtitle={<>This pages is for members only. <Button
    aria-describedby={`login-require-auth`}
    variant="contained"
    onClick={login}
    size="small"
    sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
    color="secondary"
  >
    Login with Discord
  </Button></>} />
}
