import React, { createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@emotion/react";
import { Grid } from "@mui/material";

import "./styles/Global.css";
import TridenTheme from "./styles/theme";

import Header from "./components/header";
import Home from "./pages/Home";
import Benefits from "./pages/Benefits";
import Calendar from "./pages/Calendar";
import Team from "./pages/Team";
import Tridenverse from "./pages/Tridenverse";
import GamesList from "./pages/authenticated/GamesList";
import PoliciesPage from "./pages/Policies";
import MemberHome from "./pages/authenticated/MemberHome";
import { NewGamePage, EditGamePage } from "./pages/authenticated/GameFormPage";
import ErrorPage from "./pages/ErrorPage";
import AuthErrorPage from "./pages/AuthErrorPage";
import useUser from "./api/auth";
import RequireAuth from "./components/authentication/RequireAuth";
import SnackbarAlert from "./components/SnackbarAlert";

const queryClient = new QueryClient();
//TODO since we already bit the bullet and re-added zustand for shared snackbar management, might
// we well replace this context with a store too
export const UserContext = createContext();

function AppRoutes() {
  const user = useUser();
  return (
    <UserContext.Provider value={user}>
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
    </UserContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider theme={TridenTheme}>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <SnackbarAlert/>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
