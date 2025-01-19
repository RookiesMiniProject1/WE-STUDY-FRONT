import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  maxWidth: '400px',
  margin: '40px auto'
}));

export const styles = {
  container: {
    paddingTop: 3,
    paddingBottom: 3,
    maxWidth: '500px',
  },
  title: {
    color: '#B19CD9',
    fontWeight: 600,
    marginBottom: 3,
    textAlign: 'center',
    fontSize: '2rem',
    letterSpacing: '0.1em',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  textField: {
    width: '100%',
     '& .MuiInputLabel-root.Mui-focused': {  
      color: '#B19CD9',
      },'& .MuiOutlinedInput-root': {
      height: '50px',
      '&:hover fieldset': {
        borderColor: '#B19CD9',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#B19CD9',
      },
    },
    marginTop: '15px !important',
    marginBottom: '15px !important',
  },
  loginButton: {
    backgroundColor: '#B19CD9',
    color: 'white',
    boxShadow: '0 2px 4px rgba(177, 156, 217, .3)',
    height: 45,
    width: '100%',
    padding: '0 20px',
    transition: 'all 0.3s ease-in-out',
    marginTop: '20px',
    fontSize: '1rem',
    '&:hover': {
      backgroundColor: '#9F8AC7',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 6px rgba(177, 156, 217, .4)',
    },
  },
  signupLink: {
    color: '#B19CD9',
    marginTop: 2,
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#9F8AC7',
      transform: 'translateY(-2px)',
    },
  },
  loadingBox: {
    marginTop: 2,
    display: 'flex',
    justifyContent: 'center',
    '& .MuiCircularProgress-root': {
      color: '#B19CD9',
    },
  },
};