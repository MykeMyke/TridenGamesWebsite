import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";

import "./styles/Global.css";
import TridenTheme from "./styles/theme";

import RequireAuth from "./components/authentication/RequireAuth";
import SnackbarAlert from "./components/SnackbarAlert";
import Header from "./components/header";

import { NewGamePage, EditGamePage } from "./pages/authenticated/GameFormPage";
import MemberHome from "./pages/authenticated/MemberHome";
import GamesList from "./pages/authenticated/GamesList";
import DMProfile from "./pages/authenticated/DMProfile";
import AuthErrorPage from "./pages/AuthErrorPage";
import Tridenverse from "./pages/Tridenverse";
import PoliciesPage from "./pages/Policies";
import ErrorPage from "./pages/ErrorPage";
import Benefits from "./pages/Benefits";
import Calendar from "./pages/Calendar";
import useUser from "./api/auth";
import Home from "./pages/Home";
import Team from "./pages/Team";

const queryClient = new QueryClient();
//TODO since we already bit the bullet and re-added zustand for shared snackbar management, might
// we well replace this context with a store too

function AppRoutes() {
  useUser(); //initialize user methods
  return (
    <Router>
      <Grid container direction="column" className="Background">
        <Grid item>
          <Header />
        </Grid>
        <Grid
          item
          container
          sx={{
            py: 10,
          }}
        >
          <Grid item xs={false} sm={1} />
          <Grid item xs={12} sm={10}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/team" element={<Team />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/benefits" element={<Benefits />} />
              <Route path="/tridenverse" element={<Tridenverse />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route
                path="/members"
                element={
                  <RequireAuth>
                    <MemberHome />
                  </RequireAuth>
                }
              />
              <Route
                path="/members/games"
                element={
                  <RequireAuth>
                    <GamesList />
                  </RequireAuth>
                }
              />
              <Route
                path="/members/dm_profile"
                element={
                  <RequireAuth requireDm>
                    <DMProfile />
                  </RequireAuth>
                }
              />
              <Route
                path="/members/games/new"
                element={
                  <RequireAuth requireDm>
                    <NewGamePage />
                  </RequireAuth>
                }
              />
              <Route
                path="/members/games/edit/:id"
                element={
                  <RequireAuth requireDm>
                    <EditGamePage />
                  </RequireAuth>
                }
              />
              <Route path="/auth_error" element={<AuthErrorPage />} />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </Grid>
          <Grid item xs={false} sm={1} />
        </Grid>
      </Grid>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider theme={TridenTheme}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <SnackbarAlert />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
