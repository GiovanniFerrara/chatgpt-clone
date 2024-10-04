import { styled, Theme } from '@mui/material';
import { InputBase, Button } from '@mui/material';

export const InputArea = styled('div')(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  maxHeight: theme.spacing(12),
  overflowY: 'auto',
  borderRadius: '26px',
  position: 'relative',
  backgroundColor: theme.palette.primary.light,
  margin: 'auto',
}));

export const MessageInput = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  fontSize: '1rem',
  '&:focus': {
      borderColor: theme.palette.background.paper,
  },
}));

export const SendButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  minWidth: '40px',
  padding: theme.spacing(1),
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(4),
}));
