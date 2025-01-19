import { styled } from '@mui/material/styles';
import { Dialog } from '@mui/material';

export const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    padding: '1rem'
  }
});

export const textFieldStyles = {
  '& .MuiInputLabel-root.Mui-focused': {  
    color: '#B19CD9',
  },
  '& .MuiFormLabel-root.Mui-focused': {  
    color: '#B19CD9',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(177, 156, 217, 0.2)',
    },
    '&:hover fieldset': {
      borderColor: '#B19CD9',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#B19CD9',
    },
  }
};

export const titleStyles = {
  color: '#333',
  fontWeight: 600
};

export const cancelButtonStyles = {
  color: '#637381'
};

export const createButtonStyles = {
  backgroundColor: '#B19CD9',
  '&:hover': {
    backgroundColor: '#9F8AC7',
  }
};

export const dialogContentStyles = {
  display: 'flex', 
  flexDirection: 'column', 
  gap: 2
};