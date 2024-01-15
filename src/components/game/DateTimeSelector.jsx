import { useMemo } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useFormikContext } from "formik";
import moment from "moment";


export default function DateTimeSelector(props) {
    const { values, errors, setFieldValue } = useFormikContext();
    const mValue = useMemo(() => {
        return moment(values[props.name]);
    }, [values[props.name]])
    const error = errors?.[props.name]
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker label={props.label} value={mValue} onChange={(val) => {
                setFieldValue(props.name, val.toDate())
            }}
                shouldDisableDate={(val) => {
                    return !!error ? val.toDate().getTime() === mValue.toDate().getTime(): false
                }}
                slotProps={{
                    textField: {
                        helperText: !!error ? error : ""
                    },
                }}
                />
        </LocalizationProvider>
    )
}