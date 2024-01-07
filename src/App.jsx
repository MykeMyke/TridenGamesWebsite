import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import Dashboard from "./pages/Dashboard";
import PoliciesPage from "./pages/Policies";
import MemberHome from "./pages/authenticated/MemberHome";
import GameCreationPage from "./pages/authenticated/GameCreationPage";
import ErrorPage from "./pages/ErrorPage";
import AuthErrorPage from "./pages/AuthErrorPage";

function App() {
  return (
    <ThemeProvider theme={TridenTheme}>
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
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={8}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/team" element={<Team />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/benefits" element={<Benefits />} />
                <Route path="/tridenverse" element={<Tridenverse />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/policies" element={<PoliciesPage />} />
                <Route path="/members" element={<MemberHome />} />
                <Route path="/game/create" element={<GameCreationPage />} />
                <Route path="/auth_error" element={<AuthErrorPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Grid>
            <Grid item xs={false} sm={2} />
          </Grid>
        </Grid>
      </Router>
    </ThemeProvider>
  );
}

export default App;
