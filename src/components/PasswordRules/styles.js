import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../theme';

// import theme from '../theme'
export const BoxContainer = styled(Box)(() => ({
    margin: 'auto',
    padding: "10px",

    width: '100%',
    border: '1px solid',
    borderColor: theme.palette.grey.dark,
    borderRadius: '3px',

    display: 'flex',
    flexDirection: "column",
    alignItems: 'start',

    "& *": {
        // child selector (.MuiBox-root .ChildSelector)
        // marginTop: '10px'
    }
}));

export const ListCustom = styled('ul')(() => ({
    listStyle:'none',
    "&ul li:before" :{
    content: "/2611/0020"
  }
 
}));



// ul {
//     list-style: none;
//   }
  
//   ul li:before {
//     content: '✓';
//   }