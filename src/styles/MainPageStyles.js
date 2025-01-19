import { styled, createTheme } from '@mui/material/styles';
import { Box, AppBar } from '@mui/material';

export const theme = createTheme({
  colors: {
    primary: '#B19CD9',    
    secondary: '#F2ECFF',  
    white: '#FFFFFF',
    black: '#333333'       
  }
});

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.colors.white,
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  height: '60px',         
}));

export const SubNavigationBar = styled(Box)(({ theme }) => ({
  backgroundColor: theme.colors.white,
  borderBottom: `1px solid ${theme.colors.secondary}`,
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center', 
  padding: '0 24px',
  transition: 'all 0.3s ease',
  position: 'fixed',
  top: '60px',
  left: 0,
  right: 0,
  zIndex: 1000,
}));

export const ContentSection = styled(Box)({  
  minHeight: '50vh',
  display: 'flex',
  alignItems: 'center',
});

export const SubMenuItem = styled(Box)(({ theme }) => ({
  color: theme.colors.primary,
  fontSize: '0.9rem',
  padding: '4px 12px',
  minWidth: 'auto',
  marginRight: '16px',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.colors.secondary,
    transform: 'translateY(-2px)'
  },
  '&:last-child': {
    marginRight: 0  
  }
}));

export const Footer = styled(Box)({
  marginTop: '48px',
  textAlign: 'center',
  padding: '24px 0',
  borderTop: '1px solid #eee',
});

export const FooterLogo = styled('h2')({
  color: '#B19CD9',
  margin: '0 0 16px 0',
  marginTop: '15px',
  fontWeight: 'bold',
});

export const Copyright = styled('p')({
  color: '#637381',
  fontSize: '0.700rem',
  margin: 0,
});

export const styles = {
  mainBox: {
    minHeight: '100vh',
    backgroundColor: theme.colors.white, 
  },
  logo: {
    color: theme.colors.primary,
    cursor: 'pointer',
    mr: 4,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    marginTop: '5px',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  tabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: theme.colors.primary,
      height: '3px',
      transition: 'all 0.3s ease',
    },
    '& .MuiTab-root': {
      color: theme.colors.primary,
      transition: 'all 0.3s ease',
      minWidth: '120px',
      '&.Mui-selected': {
        color: theme.colors.primary,
        fontWeight: 600,
      },
      '&:hover': {
        backgroundColor: 'rgba(177, 156, 217, 0.08)',
      }
    }
  },
  navLink: {
    color: theme.colors.primary,
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    padding: '8px 16px',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#9F8AC7',
      transform: 'translateY(-2px)'
    }
  }
};