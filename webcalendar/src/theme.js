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
});

export default TridenTheme;
