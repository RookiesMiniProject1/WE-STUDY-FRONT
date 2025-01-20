import { styled } from '@mui/material/styles';
import { 
  Box, 
  Paper, 
  Button, 
  Container, 
  TextField,
  TableContainer as MuiTableContainer,
  FormControl
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
    transition: 'all 0.3s ease',
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
  backdropFilter: 'blur(10px)',
}));

export const TableContainer = styled(MuiTableContainer)(({ theme }) => ({
  '& .MuiTableHead-root': {
    backgroundColor: 'rgba(177, 156, 217, 0.1)',
  },
  '& .MuiTableCell-head': {
    color: '#6A1B9A',
    fontWeight: 600,
    fontSize: '0.95rem',
    padding: theme.spacing(2),
  },
  '& .MuiTableRow-root': {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(177, 156, 217, 0.05)',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(177, 156, 217, 0.1)',
    },
  },
  '& .MuiTableCell-body': {
    padding: theme.spacing(2),
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B19CD9',
  color: 'white',
  borderRadius: '20px',
  padding: '8px 24px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 2px 8px rgba(177, 156, 217, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#9F8AC7',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(177, 156, 217, 0.4)',
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
    '&:hover fieldset': {
      borderColor: '#B19CD9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B19CD9',
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