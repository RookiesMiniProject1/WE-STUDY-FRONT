import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  height: '400px',
  margin: theme.spacing(2),
  backgroundColor: '#f8f9fa',
  borderRadius: '10px',
  boxShadow: '0 3px 10px rgb(0 0 0 / 0.1)',
}));

export const ContentBox = styled(Box)(() => ({
  height: '320px', 
  backgroundColor: '#fff',
  borderRadius: '8px',
  padding: '16px',
  border: '1px dashed #1a73e8'
}));

export const styles = {
  container: {
    marginTop: 4,
    marginBottom: 4
  },
  title: {
    color: '#1a73e8',
    gutterBottom: true
  },
  placeholder: {
    textAlign: 'center',
    marginTop: 10
  }
};

//커밋테스트