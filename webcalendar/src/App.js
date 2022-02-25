import logo from "./logo.svg";
import "./App.css";
import Header from "./header";
import Content from "./content";
import Grid from "@mui/material/Grid";

function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid
        item
        container
        sx={{
          pt: 10,
        }}
      >
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Content />
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
    </Grid>
  );
}

export default App;
