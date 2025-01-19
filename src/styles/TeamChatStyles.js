import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const ChatWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#F8F9FA',
  borderRadius: '12px',
  overflow: 'hidden',
  height: 'calc(100vh - 100px)',
}));

export const ChatContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  height: '100%',
}));

export const ChatRoomsList = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '12px',
  width: '300px',
  display: 'flex',
  flexDirection: 'column',
  '& .MuiListItem-root': {
    borderRadius: '8px',
    margin: '4px 8px',
    '&.Mui-selected': {
      backgroundColor: '#F2ECFF',
      '&:hover': {
        backgroundColor: '#E8E0FF',
      },
    },
  },
}));

export const MessageArea = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  borderRadius: '12px',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const MessagesContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  backgroundColor: '#FAFAFA',
}));

export const MessageInputContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid #E0E0E0',
  display: 'flex',
  gap: theme.spacing(1),
  backgroundColor: 'white',
}));

export const Message = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})(({ theme, isOwn }) => ({
  alignSelf: isOwn ? 'flex-end' : 'flex-start',
  maxWidth: '70%',
  width: 'fit-content',
  marginBottom: theme.spacing(1),
  
  '& .message-meta': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },

  '& .MuiAvatar-root': {
    width: 28,
    height: 28,
    fontSize: '0.875rem',
    backgroundColor: isOwn ? '#B19CD9' : '#F2ECFF',
    color: isOwn ? 'white' : '#B19CD9',
  },
}));

export const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOwn',
})(({ theme, isOwn }) => ({
  backgroundColor: isOwn ? '#B19CD9' : 'white',
  color: isOwn ? 'white' : '#2C3E50',
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  position: 'relative',
  maxWidth: '100%',
  wordBreak: 'break-word',

  '& .message-content': {
    marginBottom: theme.spacing(0.5),
  },

  '& .message-time': {
    fontSize: '0.75rem',
    opacity: 0.7,
    textAlign: isOwn ? 'right' : 'left',
  },
}));