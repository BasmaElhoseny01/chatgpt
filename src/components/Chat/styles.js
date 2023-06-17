import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ChatContainer = styled(Box)(() => ({
    // backgroundColor: "red",
    margin: 'auto',
    // padding: "50px",
    height: '100%',
    width: '100%',

    display: 'flex',
    flexDirection: "row",
    alignItems: 'flex-start',
    justifyContent: 'center',

    "& *": {
        // child selector (.MuiBox-root .ChildSelector)
        // marginTop: '10px'
    }
}));