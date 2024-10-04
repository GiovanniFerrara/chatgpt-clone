import { styled, Theme } from '@mui/material';
import { Box } from '@mui/material';

const drawerWidth = 240;

export const Main = styled('main')(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  marginLeft: drawerWidth,
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

export const HeaderSpacer = styled('div')(({ theme }: { theme: Theme }) => ({
  ...theme.mixins.toolbar,
}));

export const ScrollableArea = styled(Box)(() => ({
  flexGrow: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
}));
