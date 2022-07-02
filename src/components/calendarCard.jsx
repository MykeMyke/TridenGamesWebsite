import React, { useState } from "react";

import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import { CardActions } from "@mui/material";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material"
import { toLocalString } from "../utils/formatting";
import { checkTier } from "../utils/tier";
import { ReleaseDate } from "../utils/releasedate";
import CalendarLink from "./CalendarLink";

const Game = ({ data, close }) => {
  const [tab, setTab] = useState('1');
  const {
    module,
    name,
    datetime,
    length,
    number_of_players,
    max_players,
    number_of_waitlisted,
    dm_name,
    level_min,
    level_max,
    datetime_release,
    datetime_open_release,
    description,
    warnings
  } = data;

  return (
    <Card raised="true" sx={{ maxWidth: 450 }}>
      <CardContent sx={{ pt: 0.75, pb: 0.2, "&:last-child": { pb: 0 } }}>
        <Stack
          container
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="cardmain" color="text.primary" marginRight={3}>
            {toLocalString(datetime)}
          </Typography>
          <IconButton onClick={close}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <Stack
          container
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="subtitle" color="text.primary" sx={{ mr: 1 }}>
            {module}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {length}
          </Typography>
          <Typography variant="subtitle2" color="text.primary" display="block">
            {checkTier(level_min, level_max)}
          </Typography>
        </Stack>
        <Divider
          variant="middle"
          sx={{
            my: 0.6,
          }}
        />
        <Typography variant="cardmain" color="text.primary">
          {name}
        </Typography>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(event, value) => setTab(value)} aria-label="Game Detail Tabs">
              <Tab label={<Button
                variant="contained"
                size="small"
                sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
                color="secondary"
              >
                Roster
              </Button>} value="1" />
              <Tab label={<Button
                variant="contained"
                size="small"
                sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1 }}
                color="secondary"
              >Details</Button>} value="2" />
              <Tab label={<Button
                variant="contained"
                size="small"
                sx={{ pt: 0.25, pb: 0, mt: 0.4, mb: 1.1, mr: 1, minWidth: "30px" }}
                color="secondary"
              >
                📆
              </Button>} value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Typography variant="subtitle2" color="text.primary" display="block">
              DM: {dm_name}
            </Typography>
            <Grid container direction="row" justifyContent="space-between">
              <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.primary">
                  Players
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {number_of_players} / {max_players}
                </Typography>
              </Box>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Box p={1} textAlign="center" sx={{ flexGrow: 1 }}>
                <Typography variant="body1" color="text.primary">
                  Waitlist
                </Typography>
                <Typography variant="h6" color="text.primary">
                  {number_of_waitlisted}
                </Typography>
              </Box>
            </Grid>
          </TabPanel>
          <TabPanel value="2">
            <Typography
              variant="body2"
              sx={{
                p: 1,
                pb: 0,
              }}
            >
              <strong>Content Warnings:</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                p: 1
              }}
            >
              {warnings}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                p: 1,
                pb: 0,
              }}
            >
              <strong>Adventure Summary:</strong>
            </Typography>
            <Typography
              variant="body2"
              sx={{
                p: 1
              }}
            >
              {description}
            </Typography>
          </TabPanel>
          <TabPanel value="3"><CalendarLink game={data} /></TabPanel>
        </TabContext>

        {/* <Typography
          variant="subtitle2"
          color="text.secondary"
          display="block"
          sx={{ pt: 0.5 }}
        >
          Content Warnings:
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" display="block">
          {warnings}
        </Typography> */}
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions sx={{ py: 0 }}>

      </CardActions>
      <CardActions sx={{ pt: 0.2 }}>
        <Typography variant="suffix" color="text.secondary">
          {ReleaseDate(datetime_release, datetime_open_release)}
        </Typography>
      </CardActions>
    </Card>
  );
};
export default Game;
