import { styled } from '@mui/material/styles';
import { Box, Paper, Button, Select, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Container = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
}));

export const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  flex: 1,
  '@media (max-width: 768px)': {
    flexDirection: 'column'
  }
}));

export const FilterContainer = styled(Paper)(({ theme }) => ({
  flex: '0 0 300px',
  padding: theme.spacing(2.5),
  height: 'fit-content',
  borderRadius: '12px',
  position: 'sticky',
  top: theme.spacing(2),
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
}));

export const MentorGrid = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: theme.spacing(3),
  alignItems: 'start',
  '@media (max-width: 768px)': {
    gridTemplateColumns: '1fr'
  }
}));

export const Card = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: '12px',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease-in-out',
  height: 'fit-content',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 12px rgba(177, 156, 217, 0.3)',
  }
}));

export const FilterTitle = styled(Box)(({ theme }) => ({
  color: '#B19CD9',
  fontWeight: 600,
  marginBottom: theme.spacing(2.5),
  fontSize: '1.4rem',
}));

export const FilterGroup = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
  padding: theme.spacing(2),
  borderRadius: '8px',
  border: '1px solid rgba(177, 156, 217, 0.2)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: '#B19CD9',
    boxShadow: '0 0 10px rgba(177, 156, 217, 0.2)',
  },
}));

export const TechTag = styled(Box)(({ theme }) => ({
  background: 'rgba(177, 156, 217, 0.1)',
  color: '#B19CD9',
  padding: '6px 12px',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: 500,
  display: 'inline-block',
  margin: '4px',
}));

export const ContactButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#B19CD9',
  color: 'white',
  boxShadow: '0 2px 4px rgba(177, 156, 217, .3)',
  height: 42,
  padding: '0 20px',
  transition: 'all 0.3s ease-in-out',
  marginTop: '15px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#9F8AC7',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 6px rgba(177, 156, 217, .4)',
  },
}));

export const FilterLabel = styled(Box)(({ theme }) => ({
  color: '#637381',
  marginBottom: theme.spacing(1),
  fontWeight: 500,
  fontSize: '1rem',
}));

export const ProfileSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const ProfileInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const Name = styled(Box)(({ theme }) => ({
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#333333',
  marginBottom: theme.spacing(0.5),
}));

export const Career = styled(Box)(({ theme }) => ({
  color: '#637381',
  fontSize: '0.9rem',
}));

export const TechSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const TechStack = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

export const PaginationContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  width: '100%',
}));

export const PaginationStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  '& .MuiPaginationItem-root': {
    color: '#B19CD9',
  },
  '& .Mui-selected': {
    backgroundColor: '#B19CD9 !important',
    color: 'white',
  },
}));

export const SelectStyle = styled(Select)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(177, 156, 217, 0.2)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: '#B19CD9',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#B19CD9',
  },
}));

export const TechStackContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
  width: '100%'
}));

export const TechStackButton = styled(Box)(({ theme, isSelected }) => ({
  padding: '6px 12px',
  borderRadius: '20px',
  border: '1px solid #B19CD9',
  backgroundColor: isSelected ? '#B19CD9' : 'white',
  color: isSelected ? 'white' : '#637381',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: isSelected ? '#9F8AC7' : 'rgba(177, 156, 217, 0.1)',
  },
}));

export const ProfileIcon = styled(AccountCircleIcon)(({ theme }) => ({
  width: 80,
  height: 80,
  color: '#B19CD9',
  border: '3px solid #B19CD9',
  borderRadius: '50%',
}));

export const EmailText = styled(Typography)(({ theme }) => ({
  marginTop: '4px',
  marginBottom: '4px',
  fontWeight: 500,
  color: '#637381',
}));