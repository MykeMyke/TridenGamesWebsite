import { useEffect, useMemo } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useFormikContext } from "formik";
import moment from "moment/min/moment-with-locales";

export default function DateTimeSelector(props) {
  const { values, errors, setFieldValue } = useFormikContext();
  useEffect(() => {
    
  }, [navigator.language])
  const mValue = useMemo(() => {
    if (values[props.name]) {
      if (navigator?.language.indexOf('en-GB') > -1) {
        moment.locale('en-GB');
      } else {
        moment.locale('en');
      }
      return moment(values[props.name]);
    } else {
      return undefined;
    }
  }, [values[props.name], navigator]);

  console.info(moment.localeData().longDateFormat('L'))
  const error = errors?.[props.name];
  return (
    <LocalizationProvider dateAdapter={AdapterMoment} dateFormats={"YYYY"}>
      <DateTimePicker
        label={props.label}
        value={mValue}
        ampm={false}
        onChange={(val) => {
          setFieldValue(props.name, val.toDate());
          props?.onChange(val.toDate());
        }}
        format={`${moment.localeData().longDateFormat('L')} HH:MM`}
        shouldDisableDate={(val) => {
          return !!error ? val.toDate().getTime() === mValue.toDate().getTime() : false;
        }}
        slotProps={{
          textField: {
            helperText: !!error ? error : "",
          },
        }}
      />
    </LocalizationProvider>
  );
}
