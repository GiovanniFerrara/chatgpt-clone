import { styled } from '@mui/material';
import { Drawer } from '@mui/material';

const drawerWidth = 240;

export const DrawerStyled = styled(Drawer)({
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    borderRight: 'none',
  },
});
