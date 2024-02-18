import React, { forwardRef, useEffect, useState } from "react";

import { FormikProvider, useFormikContext } from "formik";
import { useParams } from "react-router";

import { Dialog, DialogActions, Container, AccordionSummary, AccordionDetails } from "@mui/material";
import { IconButton, Accordion, DialogTitle, DialogContent } from "@mui/material";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";

import { Divider, Checkbox, FormControlLabel, Tooltip } from "@mui/material";
import { Close, ExpandMore } from "@mui/icons-material";

import RealmSelector from "../../components/game/RealmSelector";
import VariantSelector from "../../components/game/VariantSelector";
import LevelRangeSelector from "../../components/game/LevelRangeSelector";
import DateTimeSelector from "../../components/game/DateTimeSelector";
import TierSelector from "../../components/game/TierSelector";
import TimeDetails from "../../components/game/TimeDetails";
import { useGame } from "../../api/games";

export function EditGamePage() {
  const { id } = useParams();
  return <GamePage id={id} />;
}

export function NewGamePage() {
  return <GamePage id="new" />;
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
  const { formik, isLoading, deleteGame } = useGame(props.id);

  return (
    <Container>
      <FormikProvider value={formik}>
        <GameForm isLoading={isLoading} deleteGame={deleteGame} />
      </FormikProvider>
    </Container>
  );
}

function GameForm(props) {
  const { values, errors, handleSubmit, handleChange, setFieldValue, setValues } = useFormikContext();
  const [showDelete, setShowDelete] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      {showDelete ? (
        <ConfirmDialog
          name={values.name}
          onClose={() => setShowDelete(false)}
          onConfirm={() => {
            props.deleteGame?.mutate();
            setShowDelete(false);
          }}
        />
      ) : null}
      <Grid rowSpacing={"0.8em"} item container sx={{ width: "100%" }}>
        <Grid item container columnSpacing={2} rowSpacing={"0.8em"} columns={{ xs: 12, md: 12 }}>
          <Grid item xs={12} sm={7}>
            <TextField
              fullWidth
              name="name"
              value={values.name}
              onChange={handleChange}
              label="Game Name"
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              name="module"
              value={values.module}
              onChange={handleChange}
              label="Module Code"
              error={!!errors.module}
              helperText={errors.module}
            />
          </Grid>
        </Grid>
        <Grid item container columnSpacing={2} columns={{ xs: 12, md: 12 }}>
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
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
          <DateTimeSelector
            label="Game Start"
            name="datetime"
            onChange={(val) => {
              const oneWeek = 1000 * 60 * 60 * 24 * 7; //id put this in a constant, above, but thats trivial perf gain
              setValues({
                ...values,
                datetime: val,
                datetime_release: new Date(val.getTime() - 2 * oneWeek),
                datetime_open_release: new Date(val.getTime() - oneWeek),
              });
            }}
          />
          <TextField
            name="duration"
            value={values.duration}
            error={!!errors.duration}
            helperText={errors.duration}
            onChange={handleChange}
            label="Game Duration (Hours)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            name="max_players"
            value={values.max_players}
            error={!!errors.max_players}
            helperText={errors.max_players}
            onChange={handleChange}
            label="Players"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TierSelector />
        </Grid>
        <Grid item xs={12}>
          <Accordion sx={{ border: "1px solid lightgrey" }}>
            <AccordionSummary expandIcon={<ExpandMore />}>Advanced Controls</AccordionSummary>
            <AccordionDetails>
              <TimeDetails />
              <LevelRangeSelector />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider fullWidth />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Tooltip title="Set to indicate that game is going to be streamed">
              <FormControlLabel
                control={<Checkbox checked={values.streaming} />}
                label="Streaming"
                onChange={(evt) => setFieldValue("streaming", evt.target.checked)}
              />
            </Tooltip>
            <Tooltip title="Set to indicate that game is a playtest">
              <FormControlLabel
                control={<Checkbox checked={values.play_test} />}
                label="Playtest"
                onChange={(evt) => setFieldValue("play_test", evt.target.checked)}
              />
            </Tooltip>
            <Tooltip title="Game is ready for release">
              <FormControlLabel
                control={<Checkbox checked={values.ready} />}
                label="Ready"
                onChange={(evt) => setFieldValue("ready", evt.target.checked)}
              />
            </Tooltip>
          </Box>
          <Divider fullWidth />
        </Grid>
      </Grid>
      <Box sx={{ margin: "0.8em 0", display: "flex", justifyContent: "center", gap: "4px" }}>
        <Button variant="contained" type="submit" disabled={props.isLoading} sx={{ minWidth: "12em" }}>
          {values.id ? "Update Game" : "Create Game"}
        </Button>
        {values.id ? (
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setShowDelete(true);
              return false;
            }}
            disabled={props.isLoading}
          >
            Delete Game
          </Button>
        ) : null}
      </Box>
    </form>
  );
}
