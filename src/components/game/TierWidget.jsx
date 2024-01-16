import { Grid, TextField } from "@mui/material";

import TierSelector from "./TierSelector";

export default function TierWidget(props) {
  const { values, handleChange } = props;

  return (
    <Grid container sx={{ padding: "1em", width: "100%" }}>
      <Grid item xs={3}>
        <TextField
          value={values.maxPlayers}
          onChange={handleChange}
          label="Players"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TierSelector />
      </Grid>
      <Grid item xs={3}>
        <TextField
          name="minLevel"
          value={values.minLevel || 1}
          onChange={handleChange}
          label="Min Level"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
          name="maxLevel"
          value={values.maxLevel || 4}
          onChange={handleChange}
          label="Max Level"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
}
