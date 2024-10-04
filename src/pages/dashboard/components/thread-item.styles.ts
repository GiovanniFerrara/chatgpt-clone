import { styled } from '@mui/material';
import { ListItem, ListItemButton, Typography } from '@mui/material';

export const Thread = styled(ListItem)(({ theme }) => ({
  margin: theme.spacing(1, 'auto'),
  display: 'flex',
  justifyContent: 'flex-start',
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const ThreadButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const ThreadName = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  fontSize: theme.typography.body2.fontSize,
  marginLeft: theme.spacing(2),
  color: theme.palette.text.primary,
}));
