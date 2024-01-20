import { forwardRef, useEffect, useState } from "react";
import { Snackbar, stepButtonClasses } from "@mui/material"
import MuiAlert from "@mui/material/Alert"
import { useShallow } from 'zustand/react/shallow'
import useAlertStore from "../stores/useAlertStore";

const Alert = forwardRef((props, ref) => {
    return <MuiAlert ref={ref} variant="filled" {...props} />
})

export default function SnackbarAlert() {
    const [messages, removeMessage]  = useAlertStore(useShallow((s) => [s.messages, s.removeMessage]));
    const [open, setOpen] = useState(messages?.length);
    useEffect(() => {
        setOpen(!!messages?.length)
    }, [messages]);
    if (messages?.length) {
        const msg = messages[0];
        return (
            <Snackbar open={open} autoHideDuration={msg.autoHideDuration || 6000} onClose={() => { removeMessage(msg.id)}}>
                <Alert severity={msg.severity || "success"} elevation={msg.elevation || 6}>{msg.text}</Alert>
            </Snackbar>
        );
    }
    return null;
    
}