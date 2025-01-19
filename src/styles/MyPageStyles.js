import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  maxWidth: '600px',
  margin: '20px auto'
}));

export const FormSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(3),
  borderRadius: '8px',
  border: '1px solid rgba(177, 156, 217, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: '#B19CD9',
    boxShadow: '0 0 10px rgba(177, 156, 217, 0.2)',
  },
}));

export const styles = {
  container: {
    paddingTop: 3,
    paddingBottom: 3,
    maxWidth: '700px',
  },
  title: {
    color: '#B19CD9',
    fontWeight: 600,
    marginBottom: 2.5,
    textAlign: 'center',
    fontSize: '1.8rem',
  },
  subTitle: {
    color: '#637381',
    marginBottom: 2,
    fontWeight: 500,
    fontSize: '1.2rem',
  },
  textField: {
    '& .MuiInputLabel-root.Mui-focused': {  
      color: '#B19CD9',
      },
    '& .MuiOutlinedInput-root': {
      height: '50px',
      '& input': {
        padding: '12px 14px',
        fontSize: '1rem',
      },
      '&:hover fieldset': {
        borderColor: '#B19CD9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#B19CD9',
      },
    },
    marginTop: '12px !important',
    marginBottom: '12px !important',
  },
  button: {
    backgroundColor: '#B19CD9',
    color: 'white',
    boxShadow: '0 2px 4px rgba(177, 156, 217, .3)',
    height: 42,
    padding: '0 20px',
    transition: 'all 0.3s ease-in-out',
    marginTop: '15px',
    '&:hover': {
      backgroundColor: '#9F8AC7',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(177, 156, 217, .4)',
    },
  },
  roleChip: {
    backgroundColor: '#B19CD9',
    color: 'white',
    fontWeight: 500,
    marginBottom: 2,
    height: '34px',  // 
    fontSize: '1rem', 
    padding: '0 15px',  
  },
};