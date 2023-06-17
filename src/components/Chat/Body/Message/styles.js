import { Box } from '@mui/material';

import { styled } from '@mui/material/styles';

import theme from '../../../../theme';

export const MessageBox = styled(Box)(({ chat }) => ({
    display: 'flex',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "center",

    margin: "5px 0px",
    padding: "10px",
    borderRadius: "5px",

    backgroundColor: chat ? theme.palette.grey.light : 'none'
}))

export const ContentPasteIconCustom = styled('Box')(() => ({
    margin: "auto 15px",

    "& :hover": {
        color: "#000000",
    }
}))