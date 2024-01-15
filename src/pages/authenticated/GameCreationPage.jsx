import { FormikProvider, useFormikContext } from "formik";
import { Grid, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import RealmSelector from "../../components/game/RealmSelector";
import VariantSelector from "../../components/game/VariantSelector";
import TierSelector from "../../components/game/TierSelector";
import DateTimeSelector from "../../components/game/DateTimeSelector";
import { useGame } from "../../api/games";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert"
import { forwardRef, useEffect, useState } from "react";


const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})
export default function GamePage() {
  const { formik, mutation, errorMessage } = useGame({ id: "new" });
  const [errorOpen, setErrorOpen] = useState(false);
  useEffect(() => {
    if (mutation.error) {
      setErrorOpen(true);
    }
  }, [mutation.error])
  return (
    <>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <FormikProvider value={formik}>
        <GameForm />
      </FormikProvider>
    </>
  );
}

function GameForm() {
  const { values, errors, handleSubmit, handleChange, setFieldValue } = useFormikContext();

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        rowSpacing={{ xs: 1, md: 2 }}
        xs={12} md={9}
        container
      >
        <Grid item xs={12}>
          <TextField fullWidth name="name" value={values.name} onChange={handleChange} label="Game Name" error={!!errors.name} helperText={errors.name} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth name="code" value={values.code} onChange={handleChange} label="Module Code" error={!!errors.code} helperText={errors.code} />
        </Grid>
        <Grid item
          container
          columnSpacing={{ xs: 2, md: 4 }}
          columns={{ xs: 12 }}>
          <Grid item xs={6}>
            <RealmSelector />
          </Grid>
          <Grid item xs={6}>
            <VariantSelector />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            multiline
            fullWidth
            minRows={4}
            value={values.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="warnings"
            multiline
            fullWidth
            minRows={4}
            value={values.warnings}
            error={!!errors.warnings}
            helperText={errors.warnings}
            onChange={handleChange}
            label="Warnings"
          />
        </Grid>
        <Grid item xs={12} container
          columnSpacing={{ xs: 2, md: 4 }}
        >
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
          <Grid item xs={3}><TierSelector /></Grid>
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
        <Grid item xs={12} container
          columnSpacing={{ xs: 2, md: 4 }}
        >
          <Grid item xs={4}>
            <DateTimeSelector label="Game Start" name="dateTime" />
          </Grid>
          <Grid item xs={4}>
            <DateTimeSelector label="Patreon Release" name="dateTimePatreonRelease" />
          </Grid>
          <Grid item xs={4}><DateTimeSelector label="General Release" name="dateTimeOpenRelease" />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel control={<Checkbox checked={values.streaming} />} label="Streaming" onChange={(evt) => setFieldValue("streaming", evt.target.checked)} />
        </Grid>
        <Grid item xs={6}>
          <FormControlLabel control={<Checkbox checked={values.ready} />} label="Ready" onChange={(evt) => setFieldValue("ready", evt.target.checked)} />
        </Grid>
        <Grid item xs={12}>
          <Button variant="outlined" type="submit">
            Create Game
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
