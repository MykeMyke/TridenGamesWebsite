import React from "react";

import { Container, Box, Typography } from "@mui/material";

export default function AuthErrorPage() {
  return (
    <Container sx={{ margin: "auto", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <Typography>An error occured during authentication</Typography>
      </Box>
    </Container>
  );
}
