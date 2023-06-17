import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DividerContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
}));

export const Hr = styled('hr')(() => ({
  width: '40%',
  height: '1.25px',
  margin: '30px',
  border: 'none',
  color: '#000000',
  backgroundColor: '#000000',
}));

export const DividerTxt = styled(Typography)(() => ({
  color: '#878a8c',
  textTransform: 'uppercase',
  fontFamily: 'ibm-plex-sans,sans-serif',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '18px',
}));
