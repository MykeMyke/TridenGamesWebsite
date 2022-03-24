import "./styles/Global.css";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@emotion/react";
import TridenTheme from "./styles/theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/header";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";

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
              pt: 11,
            }}
          >
            <Grid item xs={false} sm={2} />
            <Grid item xs={12} sm={8}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/dashboard" element={<Dashboard />} />
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
