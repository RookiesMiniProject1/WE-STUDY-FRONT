import { styled } from '@mui/material/styles';
import {
  Box,
  Paper,
  Button,
  Container,
  FormControl,
  Dialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
} from '@mui/material';


export const MainContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(3),
}));

export const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  gap: theme.spacing(2),
}));

export const SearchBox = styled(Box)(({ theme }) => ({
  flex: 1,
  maxWidth: '400px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: 'rgba(177, 156, 217, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(177, 156, 217, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: '#B19CD9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B19CD9',
    },
  },
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(177, 156, 217, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B19CD9',
  color: 'white',
  borderRadius: '20px',
  padding: '8px 24px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#9F8AC7',
  },
  '&:disabled': {
    backgroundColor: '#E0E0E0',
    color: '#9E9E9E',
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: 'rgba(177, 156, 217, 0.05)',
    '& fieldset': {
      borderColor: 'rgba(177, 156, 217, 0.2)',
    },
  },
}));

export const PageTitle = styled(Box)(({ theme }) => ({
  color: '#6A1B9A',
  fontSize: '2rem',
  fontWeight: 700,
  textAlign: 'center',
  margin: theme.spacing(4, 0),
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    backgroundColor: '#B19CD9',
    borderRadius: '2px',
  },
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      borderRadius: '16px',
      padding: theme.spacing(2),
      boxShadow: '0 4px 20px rgba(177, 156, 217, 0.25)',
    },
  }));
  
  export const DialogTitle = styled(MuiDialogTitle)(({ theme }) => ({
    color: '#6A1B9A',
    fontSize: '1.5rem',
    fontWeight: 600,
    borderBottom: '2px solid #B19CD9',
    marginBottom: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }));
  
  export const DialogButton = styled(Button)(({ theme }) => ({
    borderRadius: '8px',
    padding: '8px 24px',
    fontWeight: 600,
    textTransform: 'none',
    '&.primary': {
      backgroundColor: '#B19CD9',
      color: 'white',
      '&:hover': {
        backgroundColor: '#9F8AC7',
      },
    },
    '&.secondary': {
      color: '#6A1B9A',
      borderColor: '#B19CD9',
      '&:hover': {
        backgroundColor: 'rgba(177, 156, 217, 0.1)',
      },
    },
  }));
  
  export const DialogActions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(177, 156, 217, 0.2)',
  }));