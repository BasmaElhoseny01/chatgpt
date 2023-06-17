import { createTheme } from '@mui/material';
const theme = createTheme({
    palette: {
        primary: {
            main: '#10A37F',
            light: '#0E9272',
            // dark: '#1484D6'
        },
        grey: {
            main: '#E5E5E5',
            light: "#E5E5E5",
            dark: '#BDBDBD',
            contrastText: "#fff"
        },
        black: {
            main: '#000000',
            light: "#E5E5E5",
            dark: '#BDBDBD',
            contrastText: "#fff"
        },
        lightBlack: {
            main: '#555555',
            light: "#E5E5E5",
            dark: '#BDBDBD',
            contrastText: "#fff"
        }
    }
});
export default theme;