import { createTheme } from "@mui/material";

const primaryColor = "#191919";
const secondaryColor = "#630000";
const accentColor = "#303030";

const TridenTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    accent: {
      main: accentColor,
    },
  },

  typography: {
    suffix: {
      // fontFamily: "Roboto","Helvetica",
      fontWeight: 500,
      fontSize: "0.72rem",
      lineHeight: 1.3,
      letterSpacing: "0.002em",
    },
  },
});

export default TridenTheme;
