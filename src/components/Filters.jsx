import React from "react";
import { useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import useFilterStore from "../stores/useFilterStore";

function TernaryFilter({ label, name, value, onChange }) {
  return (
    <FormControl sx={{ border: "1px solid lightgray", px: 1 }}>
      <FormLabel>
        <Typography variant="subtitle2">{label}</Typography>
      </FormLabel>
      <RadioGroup row aria-label="horizontal-radio-group" name={name} value={value} onChange={(evt) => onChange(evt.target.value)}>
        <FormControlLabel value={true} control={<Radio size="small" checked={value === true} />} label="Yes" />
        <FormControlLabel value={false} control={<Radio size="small" checked={value === false} />} label="No" />
        <FormControlLabel
          value={undefined}
          control={<Radio size="small" checked={value === null || value === undefined} />}
          label="Any"
        />
      </RadioGroup>
    </FormControl>
  );
}

function Filters() {
  const [open, setOpen] = useState(false);
  const [
    allTimeSlots,
    allRealms,
    allVariants,
    allTiers,
    sName,
    setName,
    slots,
    setSlots,
    realms,
    setRealms,
    variants,
    setVariants,
    tiers,
    setTiers,
    playTest,
    setPlayTest,
    streaming,
    setStreaming,
  ] = useFilterStore((s) => [
    s.allTimeSlots,
    s.allRealms,
    s.allVariants,
    s.allTiers,
    s.name,
    s.setName,
    s.slots,
    s.setSlots,
    s.realms,
    s.setRealms,
    s.variants,
    s.setVariants,
    s.tiers,
    s.setTiers,
    s.playTest,
    s.setPlayTest,
    s.streaming,
    s.setStreaming,
  ]);
  const name = useMemo(() => {
    return sName || "";
  }, [sName]);

  const timeStrings = useMemo(() => {
    return (allTimeSlots || []).map((slot) => slot.text);
  }, [allTimeSlots]);
  const { filterString, filterCount } = useMemo(() => {
    if (!name?.length && !slots?.length) {
      return { filterString: "", filterCount: 0 };
    }
    return {
      filterString: `${name?.length ? `By Name: ${name}${slots?.length ? "," : ""} ` : ""}${
        slots?.length
          ? `Start Time: ${slots
              .sort()
              .map((slot) => timeStrings[slot])
              .join(", ")}`
          : ""
      }`,
      filterCount: (slots || []).length + (name?.length ? 1 : 0),
    };
  }, [name, slots]);
  const realmVals = useMemo(() => {
    if (realms?.length) {
      return allRealms.filter((realm) => realms.includes(realm.value));
    }
    return [];
  }, [allRealms, realms]);
  const variantVals = useMemo(() => {
    if (variants?.length) {
      return allVariants.filter((vr) => variants.includes(vr.value));
    }
    return [];
  }, [allVariants, variants]);
  const tierVals = useMemo(() => {
    if (tiers?.length) {
      return allTiers.filter((vr) => tiers.includes(vr.value));
    }
    return [];
  }, [allTiers, tiers]);
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
        <span>Filters:</span>
        <Button color="secondary" variant="contained" onClick={() => setOpen(!open)}>
          Edit{filterCount ? ` (${filterCount})` : ""}
        </Button>{" "}
        {filterString?.length ? (
          <>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setName("");
                setSlots([]);
              }}
            >
              Clear
            </Button>
            <span class="desktopOnly">{filterString}</span>
          </>
        ) : null}
      </Box>
      <Drawer variant="temporary" BackdropProps={{ invisible: true }} open={open}>
        <Box
          sx={{
            paddingTop: "75px",
            maxWidth: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 2,
            mx: 2,
          }}
        >
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
            <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
              <ChevronLeft />
              Close Filters
            </Button>
          </Box>{" "}
          <TextField
            className="Name-Filter"
            id="nameFilter"
            label="Filter by Discord Name"
            helperText="{Discord Name"
            variant="outlined"
            size="small"
            margin="dense"
            value={name}
            onChange={(evt) => setName(evt.target.value)}
          />
          <Box sx={{ width: "100%", display: "grid", gridTemplateColumns: "50% 50%", mb: 2 }}>
            {allTimeSlots.map((slot) => (
              <FormControlLabel
                key={`${slot.value}_${slot.text}`}
                checked={slots.some((s) => s === slot.value)}
                control={
                  <Checkbox
                    onChange={(evt) => {
                      if (evt.target.checked) {
                        setSlots([...slots, slot.value]);
                      } else {
                        setSlots(slots.filter((s) => s !== slot.value));
                      }
                    }}
                  />
                }
                label={<FormHelperText>{slot.text}</FormHelperText>}
              />
            ))}
          </Box>
          <Autocomplete
            multiple
            id="combo-box-realms"
            options={allRealms}
            getOptionLabel={(realm) => realm.text}
            getOptionKey={(realm) => realm.value}
            value={realmVals}
            onChange={(evt, value) => setRealms(value.map((val) => val.value))}
            renderInput={(params) => <TextField {...params} label="Realms" />}
          />
          <Autocomplete
            multiple
            id="combo-box-vars"
            options={allVariants}
            getOptionLabel={(variant) => variant.text}
            getOptionKey={(variant) => variant.value}
            value={variantVals}
            onChange={(evt, value) => setVariants(value.map((val) => val.value))}
            renderInput={(params) => <TextField {...params} label="Game Type" />}
          />
          <Autocomplete
            multiple
            id="combo-box-tiers"
            options={allTiers}
            getOptionLabel={(tier) => tier.text}
            getOptionKey={(tier) => tier.value}
            value={tierVals}
            onChange={(evt, value) => setTiers(value.map((val) => val.value))}
            renderInput={(params) => <TextField {...params} label="Tiers" />}
          />
          <TernaryFilter label="Play Test?" name="playTest" value={playTest} onChange={(val) => setPlayTest(val)} />
          <TernaryFilter label="Streaming?" name="streaming" value={streaming} onChange={(val) => setStreaming(val)} />
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
              setName("");
              setSlots([]);
              setRealms([]);
              setVariants([]);
              setTiers([]);
            }}
          >
            Clear All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default Filters;
