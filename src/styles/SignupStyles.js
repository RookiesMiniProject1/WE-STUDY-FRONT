import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

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
  radioGroup: {
    justifyContent: 'center',
    marginBottom: 2,
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
  techStackContainer: {
    marginBottom: 2,
  },
  techStackTitle: {
    marginBottom: 1,
    color: '#666',
    fontWeight: 500,
  },
  techStackGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
  },
  techStackButton: (isSelected) => ({
    margin: '0.2rem',
    backgroundColor: isSelected ? '#B19CD9' : 'white',
    color: isSelected ? 'white' : '#666',
    border: '1px solid #B19CD9',
    padding: '6px 12px',
    borderRadius: '25px',
    '&:hover': {
      backgroundColor: isSelected ? '#9F8AC7' : '#F2ECFF',
      borderColor: '#B19CD9',
    },
    '&.Mui-disabled': {
      backgroundColor: '#E0E0E0',
      borderColor: '#E0E0E0',
    }
  }),
};