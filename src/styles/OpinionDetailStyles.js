import { styled } from '@mui/material/styles';
import { 
  Box, 
  Paper, 
  Button, 
  Container, 
  Typography,
  TextField,
  Divider as MuiDivider 
} from '@mui/material';

export const DetailContainer = styled(Container)(({ theme }) => ({
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(2),
}));

export const PostPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  marginBottom: theme.spacing(3),
}));

export const PostHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const PostTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.3rem',
  fontWeight: 600,
  color: '#2D3748',
  marginBottom: theme.spacing(1),
}));

export const PostInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: '#718096',
  fontSize: '0.9rem',
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  backgroundColor: 'rgba(177, 156, 217, 0.2)',
}));

export const PostContent = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  lineHeight: 1.7,
  color: '#4A5568',
  whiteSpace: 'pre-wrap',
}));

export const CommentSection = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(177, 156, 217, 0.05)',
  padding: theme.spacing(3),
  borderRadius: '12px',
  marginTop: theme.spacing(3),
}));

export const CommentTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#6A1B9A',
  marginBottom: theme.spacing(2),
}));

export const CommentCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: '8px',
  backgroundColor: '#fff',
  '& .MuiTypography-root': {
    fontSize: '0.95rem',
  },
}));

export const CommentInput = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    fontSize: '0.9rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: 'rgba(177, 156, 217, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: '#B19CD9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B19CD9',
    },
  },
}));

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  justifyContent: 'flex-end',
  marginTop: theme.spacing(2),
}));

export const BackButton = styled(Button)(({ theme }) => ({
  color: '#6A1B9A',
  fontSize: '0.9rem',
  padding: '6px 16px',
  marginBottom: theme.spacing(2),
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 600,
  border: '2px solid #B19CD9',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(177, 156, 217, 0.1)',
    borderColor: '#9F8AC7',
  },
}));

export const ActionButton = styled(Button)(({ theme, variant }) => ({
  backgroundColor: variant === 'delete' ? '#FF5B5B' : '#B19CD9',
  color: 'white',
  fontSize: '0.9rem',
  padding: '6px 16px',
  borderRadius: '20px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 2px 8px rgba(177, 156, 217, 0.3)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: variant === 'delete' ? '#FF3B3B' : '#9F8AC7',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(177, 156, 217, 0.4)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      '& fieldset': {
        borderColor: 'rgba(177, 156, 217, 0.3)',
      },
      '&:hover fieldset': {
        borderColor: '#B19CD9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#B19CD9',
      },
    },
    '& .MuiInputLabel-root': {
      color: '#6A1B9A',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#B19CD9',
    },
  }));