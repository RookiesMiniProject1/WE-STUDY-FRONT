import { styled } from '@mui/material/styles';
import { Box, Button, Card as MuiCard, Tabs } from '@mui/material';

export const Container = styled(Box)({
  padding: '24px',
  maxWidth: '1200px',
  margin: '0 auto',
});

export const StyledTabs = styled(Tabs)({
  marginBottom: '24px',
  borderBottom: '1px solid #e0e0e0',
  '& .MuiTab-root': {
    textTransform: 'none',
    minWidth: '120px',
    fontSize: '16px',
    '&.Mui-selected': {
      color: '#B19CD9',
    },
  },
  '& .MuiTabs-indicator': {
    backgroundColor: '#B19CD9',
  },
});

export const StudyGrid = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
    marginTop: '24px',
  })

export const StudyCard = styled(Box)({
  borderRadius: '12px',
  padding: '14px',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

export const StudyListItem = styled(Box)({
  padding: '16px',
  borderRadius: '8px',
  backgroundColor: 'white',
  marginBottom: '12px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#F8F9FA',
  },
});

export const StatusChip = styled(Box)(({ status }) => ({
  padding: '4px 12px',
  borderRadius: '16px',
  fontSize: '14px',
  fontWeight: '700',
  backgroundColor: 
    status === 'APPROVED' ? '#E8F5E9' : 
    status === 'PENDING' ? '#FFF3E0' : 
    status === 'REJECTED' ? '#FFEBEE' : '#F5F5F5',
  color: 
    status === 'APPROVED' ? '#2E7D32' :
    status === 'PENDING' ? '#E65100' :
    status === 'REJECTED' ? '#C62828' : '#616161',
}));

export const RequestBadge = styled(Box)({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#B19CD9',
  color: 'white',
  borderRadius: '50%',
  padding: '2px 6px',
  fontSize: '12px',
  marginLeft: '8px',
  minWidth: '20px',
  opacity: 0.9,
});

export const RequestActions = styled(Box)({
  display: 'flex',
  gap: '8px',
});

export const ApproveButton = styled(Button)({
  backgroundColor: '#B19CD9',
  color: 'white',
  '&:hover': {
    backgroundColor: '#9E8BC0',
  },
});

export const RejectButton = styled(Button)({
  backgroundColor: '#FFE7E7',
  color: '#FF4842',
  '&:hover': {
    backgroundColor: '#FFD4D4',
  },
});

export const EmptyMessage = styled(Box)({
  textAlign: 'center',
  padding: '40px',
  color: '#637381',
  backgroundColor: '#F9FAFB',
  borderRadius: '8px',
  margin: '20px 0',
});

export const ChipStyled = {
  backgroundColor: '#F2ECFF',
  color: '#B19CD9',
  marginRight: '8px',
  marginBottom: '8px',
};