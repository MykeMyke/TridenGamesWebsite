import "./Global.css";
import Header from "./header";
import Content from "./content";
import Grid from "@mui/material/Grid";
import { ThemeProvider } from "@emotion/react";
import TridenTheme from "./theme";

function App() {
  return (
    <ThemeProvider theme={TridenTheme}>
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
            <Content />
          </Grid>
          <Grid item xs={false} sm={2} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
