import { styled } from '@mui/material';
import { Box } from '@mui/material';

export const NewChatBox = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  color: theme.palette.text.primary,
}));
