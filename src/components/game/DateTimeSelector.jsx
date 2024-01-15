import { useState, useEffect, useMemo } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useFormikContext } from "formik";
import moment from "moment";
import { FormControl, FormControlLabel, FormHelperText, Input, InputAdornment } from "@mui/material";

export default function DateTimeSelector(props) {
    const mValue = useMemo(() => {
        return moment(props.value);
    }, [props.value])
    
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker label={props.label} value={mValue} onChange={val => {
                props.onChange(val.toDate());
                props.onError(null)
            }}
                onError={(newError) => {
                    if (!newError) {
                        props.onError(null);
                    }
                }}
                shouldDisableDate={(val) => {
                    return !!props.error ? val.toDate().getTime() === props.value.getTime(): false
                }}
                slotProps={{
                    textField: {
                        helperText: !!props.error ? props.error : ""
                    },
                }}
                />
        </LocalizationProvider>
    )
}