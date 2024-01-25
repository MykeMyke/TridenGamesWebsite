import { useMemo } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { useFormikContext } from "formik";
import { enGB, enUS } from "date-fns/locale";

export default function DateTimeSelector(props) {
  const { values, errors, setFieldValue } = useFormikContext();
   const locale = useMemo(() => {
    if (navigator?.language.indexOf("en-GB") > -1) {
      return enGB;
    } else {
      return enUS;
    }
  }, [ navigator])
  const mValue = useMemo(() => {
      return values[props.name];
  }, [values[props.name]]);

  const error = errors?.[props.name];
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale} dateFormats={"YYYY"}>
      <DateTimePicker
        disabled={props.disabled}
        sx={props.sx}
        label={props.label}
        value={mValue}
        ampm={false}
        onChange={(val) => {
          setFieldValue(props.name, val);
          props?.onChange(val);
        }}
        shouldDisableDate={(val) => {
          return !!error ? val.getTime() === mValue.getTime() : false;
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
