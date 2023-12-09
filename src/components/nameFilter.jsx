import React from "react";
import { useMemo, useState } from 'react';
import { Box, Button, Checkbox, Drawer, FormControlLabel, FormHelperText, TextField } from "@mui/material";
import { ChevronLeft } from "@mui/icons-material"
import { timeSlots } from "../api/games";

const timeStrings = timeSlots.map(slot => slot.text)

function NameFilter({ setActiveName, activeName, slots, setSlots }) {
  const [open, setOpen] = useState(false);

  const { filterString, filterCount } = useMemo(() => {
    if (!activeName.length && !slots.length) {
      return { filterString: "", filterCount: 0 }
    }
    return {
      filterString: `${activeName?.length ? `By Name: ${activeName}${slots.length ? "," : ""} ` : ""}${slots.length ? `Start Time: ${slots.sort().map(slot => timeStrings[slot]).join(', ')}` : ""}`,
      filterCount: slots.length + (activeName.length ? 1 : 0)
    };
  }, [ activeName, slots])
  // function nameFilter() {
  return (
    <>
      <Box
      sx={{
          display: "grid",
        gridTemplateColumns: "40px 100px 80px 1fr",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 2,
        mb: 2,
        ml: 2,
        mr: 2,
      }}
      >
        <span>Filters:</span><Button color="secondary" variant="contained" onClick={() => setOpen(!open)}>Edit{filterCount ? ` (${filterCount})` : ""}</Button> {filterString?.length ? (
          <><Button color="secondary" variant="contained" onClick={() => { setActiveName(""); setSlots([]) }}>Clear</Button>
            <span class="desktopOnly">{filterString}</span>
            </>
        ): null}
      </Box>
    <Drawer variant="temporary" BackdropProps={{ invisible: true }} open={open}>
      <Box
          sx={{
          paddingTop: "75px",
        maxWidth:"300px",
        display: "flex",
        flexDirection:"column",
        justifyContent: "flex-start",
        gap: 4,
        mb: 2,
        ml: 2,
      }}
        >
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
              <ChevronLeft />Close Filters
            </Button>
          </Box>
          <Box>
            <h4>By Time</h4>
            <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: "50% 50%"}}>
        {timeSlots.map(slot => (
          <FormControlLabel key={`${slot.value}_${slot.text}`} checked={slots.some(s => s === slot.value)} control={<Checkbox onChange={(evt) => {
            if (evt.target.checked) {
              setSlots([...slots, slot.value])
            } else {
              setSlots(slots.filter(s => s !== slot.value))
            }
          }} />} label={<FormHelperText>{slot.text}</FormHelperText>} />
        ))}
              </Box>
      <TextField
        className="Name-Filter"
        id="nameFilter"
        label="Filter by Discord Name"
        helperText="Discord Name without #xxxx or Discord ID"
        variant="outlined"
        size="small"
        margin="dense"
        value={activeName}
        onChange={(evt) => setActiveName(evt.target.value)}
        sx={{ mr: 1 }}
      />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => {
          setActiveName("");
          setSlots([]);
        }}
      >
        Clear All
      </Button>
          </Box>
        </Box>  
      </Drawer>
    </>
    
  );
}

export default NameFilter;
