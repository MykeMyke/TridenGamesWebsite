import { Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Box, Grid, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import RealmSelector from "../../components/game/RealmSelector";
import VariantSelector from "../../components/game/VariantSelector";
import TierSelector from "../../components/game/TierSelector";
import DateTimeSelector from "../../components/game/DateTimeSelector";

let url = "http://127.0.0.1:8000/api/games/";

const req = (field) => {
  const label = typeof field === 'string' ? label : field.label;
  return `${label} is required`;
}

export default function GamePage() {
  const formik = {
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .label("Name")
        .required(req),
      code: Yup.string()
        .label("Code")
        .required(req),
      description: Yup.string().label("Description").required(req).min(1, req),
      dateTime: Yup.date().required().min(new Date(), "Game start must be in the future"),
      dateTimePatreonRelease: Yup.date().label('Patreon Release').required().test(("dateTimePatreonRelease", (value, context) => {
        if (value.getTime() >= context.parent.dateTime.getTime()) {
          return context.createError({ path: "dateTimePatreonRelease", message: ({ label }) => `${label} must be before Game Time` });
        }
        return true;
      })),
      dateTimeOpenRelease: Yup.date().label('General Release').required().test(("dateTimeOpenRelease", (value, context) => {
        if (value.getTime() >= context.parent.dateTime.getTime()) {
          return context.createError({ path: "dateTimeOpenRelease", message: ({ label }) => `${label} must be before Game Time` });
        }
        if (value.getTime() <= context.parent.dateTimePatreonRelease.getTime()) {
          return context.createError({ path: "dateTimeOpenRelease", message: ({ label }) => `${label} must be after Patreon Release` });
        }
        return true;
      }))
    }),
    initialValues: {
      name: "",
      code: "",
      realm: "faerun",
      variant: "resAL",
      description: "",
      maxPlayers: 6,
      tier: 1,
      minLevel: 1,
      maxLevel: 4,
      warnings: "",
      streaming: false,
      dateTime: new Date(),
      dateTimePatreonRelease: new Date(),
      dateTimeOpenRelease: new Date(),
      length: "4 hours",
      ready: true

    },
    onSubmit: (values) => {
      console.info("This is only called if validation passes");
      console.info("SUBMITTING", values)
    }
  };

  return (
    <Formik {...formik}>
      <GameForm />
    </Formik>
  );
}

function GameForm() {

  const { values, errors, handleSubmit, handleChange, setFieldValue } = useFormikContext();
  console.info("FUCK YOU", errors.description)
  return (
    <form onSubmit={handleSubmit}>
      <Grid
        justifyContent="space-between"
        spacing="20"
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
          columnSpacing={1}
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
          columnSpacing={1}
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
