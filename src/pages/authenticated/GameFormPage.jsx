import { FormikProvider, useFormikContext } from "formik";
import { useParams } from "react-router";
import { Grid, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import RealmSelector from "../../components/game/RealmSelector";
import VariantSelector from "../../components/game/VariantSelector";
import TierSelector from "../../components/game/TierSelector";
import DateTimeSelector from "../../components/game/DateTimeSelector";
import { useGame } from "../../api/games";
import { Dialog, DialogActions, DialogTitle, DialogContent, Box, Typography, IconButton, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert"
import { forwardRef, useEffect, useState } from "react";
import { Close } from "@mui/icons-material";


const Alert = forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function EditGamePage() {
  const { id } = useParams();
  return <GamePage id={id} />
}

export function NewGamePage() {
  return <GamePage id="new" />
}

const ConfirmDialog = ({ name, onClose, onConfirm }) => {
  return (
    <Dialog open={true} maxWidth="sm" fullWidth>
      <DialogTitle>Are you sure you want to delete {name}?</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography>You cannot undo this action</Typography>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button color="secondary" variant="contained" onClick={() => onConfirm()}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function GamePage(props) {
  const { formik, saveGame, isLoading, errorMessage, successMessage, deleteGame } = useGame(props.id);
  const [errorOpen, setErrorOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  useEffect(() => {
    if (saveGame.error) {
      setErrorOpen(true);
    }
  }, [saveGame.error])
  useEffect(() => {
    if (successMessage) {
      setSuccessOpen(true);
    }
  }, [successMessage])

  return (
    <>
      <Snackbar open={errorOpen} autoHideDuration={6000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <Snackbar open={successOpen} autoHideDuration={6000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <FormikProvider value={formik}>
        <GameForm isLoading={isLoading} deleteGame={deleteGame} />
      </FormikProvider>
    </>
  );
}
function GameForm(props) {
  const { values, errors, handleSubmit, handleChange, setFieldValue } = useFormikContext();
  const [showDelete, setShowDelete] = useState(false);
  
  return (
    <form onSubmit={handleSubmit}>
      {showDelete ? <ConfirmDialog name={values.name} onClose={() => setShowDelete(false)} onConfirm={() => {
        props.deleteGame?.mutate();
        setShowDelete(false)
      }}/> : null}
      <Grid
        rowSpacing={2}
        xs={12} md={9}
        item
        container
      >
        <Grid item xs={12} md={9}>
          <TextField fullWidth name="name" value={values.name} onChange={handleChange} label="Game Name" error={!!errors.name} helperText={errors.name} />
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField fullWidth name="module" value={values.module} onChange={handleChange} label="Module Code" error={!!errors.module} helperText={errors.module} />
        </Grid>
        <Grid item
          container
          columnSpacing={2}
          columns={{ xs: 12, md: 12 }}>
          <Grid item xs={6} md={6}>
            <RealmSelector />
          </Grid>
          <Grid item xs={6} md={6}>
            <VariantSelector />
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}>
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
        <Grid item xs={12} md={12}>
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
        <Grid item xs={12} md={9} container
          columnSpacing={2}
        >
          <Grid item xs={3}>
            <TextField
              value={values.max_players}
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
              value={values.level_min || 1}
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
              value={values.level_max || 4}
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
          columnSpacing={2}
        >
          <Grid item xs={6} md={6}>
            <DateTimeSelector label="Game Start" name="datetime" />
          </Grid>
          <Grid item xs={6} md={6}>
            <FormControlLabel control={<Checkbox checked={values.streaming} />} label="Streaming" onChange={(evt) => setFieldValue("streaming", evt.target.checked)} />
          </Grid>
        </Grid>
        <Grid item xs={12} container
          columnSpacing={2}
        >
          <Grid item xs={6} md={6}>
            <DateTimeSelector label="Patreon Release" name="datetime_release" />
          </Grid>
          <Grid item xs={6} md={6}><DateTimeSelector label="General Release" name="datetime_open_release" />
          </Grid>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControlLabel control={<Checkbox checked={values.ready} />} label="Ready" onChange={(evt) => setFieldValue("ready", evt.target.checked)} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Button variant="outlined" type="submit" disabled={props.isLoading}>
            {values.id ? "Update Game" : "Create Game"}
          </Button>
          {values.id ? (
            <Button variant="outlined" onClick={() => { setShowDelete(true); return false }} disabled={props.isLoading}>
              Delete Game
            </Button>
          ) : null}
        </Grid>
      </Grid>
    </form>
  );
}
