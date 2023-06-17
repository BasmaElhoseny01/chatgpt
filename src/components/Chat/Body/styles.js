import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChatBodyContainer = styled(Box)(() => ({
    margin: 'auto',
    padding: "10px",
    height: '100%',
    width: '100%',


    display: 'flex',
    flexDirection: "column",
    // alignItems: 'flex-start',
    // justifyContent: 'center',

    "& *": {
        // child selector (.MuiBox-root .ChildSelector)
        // marginTop: '10px'
    }
}));