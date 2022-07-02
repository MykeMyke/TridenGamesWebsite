import "../styles/Global.css";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import "../styles/calendar.scss"
import React, { useState, useEffect } from "react";
import moment from 'moment'
import Popup from "reactjs-popup";

import { Fab, Grid, Typography } from "@mui/material";
import { getGames } from "../api/games";
import Game from "../components/calendarCard";
import { checkDaysToGo } from "../utils/daysToGo";
import TridenAvatar from "../img/TridenAvatar2048.png";
import AddBoxIcon from "@mui/icons-material/AddBox";

import { Calendar, momentLocalizer } from 'react-big-calendar'
const mLocalizer = momentLocalizer(moment)

const Modal = ({event, close}) => {
  return event === undefined ? null : (
    <Popup open={true} closeOnDocumentClick onClose={close}>
      <div className="modal">
        <div className="content">
          <Game data={event} close={close} />
        </div>
      </div>
    </Popup>
  )
}

const duration = (length) => {
  const numDiv = length.split(' ');
  //todo, either get some more advanced parsing or work
  //on getting a numeric duration from backend
  return parseInt(numDiv[0]) * 60 * 60 * 1000;
}

export default function EventsCalendar() {
  const [data, setData] = useState([]);
  const [ modalEvent, setModalEvent ] = useState();
  useEffect(() => {
    getGames().then((result) => setData(result.data))
  }, []);
  
  const calendarData = data.map(event => {
    const start = new Date(event.datetime);
    const end = new Date(start.getTime() + duration(event.length));
    return { ...event, title: event.name, start: start, end: end}
  });
  
  //Only filtering for future games at present
  const filteredData = data.filter((x) => Date.parse(x.datetime) > new Date());
  const lastDate = filteredData.map((a) => a.datetime).reverse()[0];
  
  return (
    <>
      <Modal event={modalEvent} close={() => setModalEvent(undefined)}/>
      <div style={{ minHeight: "400px", height: "700px" }}>
        <Calendar
        events={calendarData}
        localizer={mLocalizer}
        startAccessor="start"
          endAccessor="end"
          popup={true}
          selectable={true}
          onSelectEvent={event => {
            setModalEvent(event);
          }}
        />
      </div>
      <hr/>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        sx={{ mb: 2 }}
      >
        <Grid item sx={{ ml: 1.5, pr: 1.5 }}>
          <img src={TridenAvatar} alt="Triden Games" className="Logo" />
        </Grid>
        <Grid item xs={9}>
          <Typography
            variant="h5"
            color="text.primary"
            sx={{ fontSize: "1.2rem" }}
          >
            There are <strong>{filteredData.length} games</strong> scheduled in
            the next {checkDaysToGo(lastDate)} days
          </Typography>
          <Typography variant="subtitle1" color="text.primary">
            Signups to games on{" "}
            <a
              href="https://discord.gg/JDB6BYTK9T"
              target="_blank"
              rel="noreferrer"
            >
              the Triden Discord server
            </a>
            .
          </Typography>{" "}
        </Grid>
      </Grid>
          <Fab
            variant="extended"
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: "1%", right: "10%" }}
            href="https://unseen-servant.digitaldemiplane.com/admin/core/game/add/"
            target="_blank"
            rel="noreferrer"
          >
            <AddBoxIcon fontSize="large" sx={{ mr: 1 }} /> Create a Game
          </Fab>
      
      {/* <Typography variant="subtitle1" color="text.primary" sx={{ mt: 12 }}>
        <a href="/dashboard">Admin Dashboard</a>.
      </Typography> */}
    </>
  );
}
