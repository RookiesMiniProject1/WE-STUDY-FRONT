import { styled } from '@mui/material/styles';
import { 
  Paper, 
  FormControl, 
  TextField, 
  Button, 
  Box
} from '@mui/material';

export const MainContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "1200px",
  margin: "0 auto",
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(177, 156, 217, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
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
  '&:disabled': {
    backgroundColor: '#E0E0E0',
    cursor: 'not-allowed',
    transform: 'none',
    boxShadow: 'none',
  },
}));

export const SearchBox = styled(Box)(({ theme }) => ({
  width: '300px',
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

export const TableContainer = styled('div')(({ theme }) => ({
  overflowX: "auto",
  '& .MuiTableHead-root': {
    backgroundColor: 'rgba(177, 156, 217, 0.1)',
  },
  '& .MuiTableCell-head': {
    color: '#6A1B9A',
    fontWeight: 600,
  },
  '& .MuiTableRow-root': {
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(177, 156, 217, 0.05)',
      transform: 'translateY(-1px)',
      boxShadow: '0 2px 8px rgba(177, 156, 217, 0.1)',
    },
  },
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: "200px",
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

export const Header = styled('div')(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: theme.spacing(3),
  gap: theme.spacing(2),
}));

export const PageTitle = styled('h1')(({ theme }) => ({
  color: '#6A1B9A',
  fontSize: '2rem',
  fontWeight: 700,
  textAlign: 'center',
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: '47%',
    width: '60px',
    height: '4px',
    backgroundColor: '#B19CD9',
    borderRadius: '2px',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
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

export const StatusChip = styled('div')(({ theme }) => ({
  padding: '4px 8px',
  borderRadius: '16px',
  color: 'white',
  display: 'inline-block',
  fontSize: '12px',
  fontWeight: 600,
  boxShadow: '0 2px 4px rgba(177, 156, 217, 0.2)',
}));

export const DetailContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "1200px",
  margin: "0 auto",
}));

export const AssignPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(177, 156, 217, 0.1)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

export const AssignHeader = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const AssignTitle = styled('h1')(({ theme }) => ({
  fontSize: '24px',
  marginBottom: theme.spacing(2),
  color: '#6A1B9A',
  fontWeight: 600,
}));

export const AssignInfo = styled('div')(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: '#666',
}));

export const AssignContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  whiteSpace: "pre-wrap",
  lineHeight: 1.6,
}));

export const SubmissionSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(5),
}));

export const SubmissionCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 2px 12px rgba(177, 156, 217, 0.1)',
}));

export const ButtonGroup = styled('div')(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  justifyContent: "flex-end",
}));

export const BackButton = styled(Button)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: '#6A1B9A',
  '&:hover': {
    backgroundColor: 'rgba(177, 156, 217, 0.1)',
  },
}));

export const Divider = styled('hr')(({ theme }) => ({
  margin: theme.spacing(3, 0),
  border: 'none',
  borderTop: '1px solid rgba(177, 156, 217, 0.2)',
}));

export const FeedbackSection = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(3),
  backgroundColor: 'rgba(177, 156, 217, 0.05)',
  borderRadius: '8px',
  border: '1px solid rgba(177, 156, 217, 0.1)',
}));

export const FileUploadButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(2),
  backgroundColor: '#B19CD9',
  color: 'white',
  '&:hover': {
    backgroundColor: '#9F8AC7',
  },
}));

export const StatusSelect = styled(TextField)(({ theme }) => ({
  minWidth: '120px',
  '& .MuiOutlinedInput-root': {
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