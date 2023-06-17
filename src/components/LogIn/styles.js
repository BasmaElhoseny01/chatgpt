import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import theme from '../../theme'
export const AuthenticationContainer = styled(Box)(() => ({
    margin: 'auto',
    // padding: "50px",
    height: '100vh',
    width: '350px',

    display: 'flex',
    flexDirection: "column",
    alignItems: 'center',

    "& *": {
        // child selector (.MuiBox-root .ChildSelector)
        // marginTop: '10px'
    }
}));

export const Image = styled('img')(() => ({
    width: '100px',
    marginTop: '0px'

}));

export const StyledLink = styled('a')(() => ({

    textDecoration: 'none',
    color: theme.palette.primary.main,

    '&.MuiLink-root:hover': {
        color: theme.palette.primary.fade,
    },

}));
