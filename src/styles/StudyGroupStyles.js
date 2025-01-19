import { styled } from '@mui/material/styles';
import { Box, Button, Dialog, Pagination } from '@mui/material';

export const Container = styled(Box)({
  padding: '24px',
  maxWidth: '1200px',
  margin: '0 auto',
});

export const Header = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
  gap: '16px',
  flexWrap: 'wrap',
});

export const SearchContainer = styled(Box)({
  display: 'flex',
  gap: '8px',
  flex: 1,
  minWidth: '300px',
});

export const CreateButton = styled(Button)({
  backgroundColor: '#B19CD9',
  color: 'white',
  '&:hover': {
    backgroundColor: '#9E8BC0',
  },
});

export const FilterButton = styled(Button)({
  minWidth: '48px',
  padding: '8px',
  color: '#B19CD9',
  border: '1px solid #B19CD9',
  '&:hover': {
    backgroundColor: '#F2ECFF',
  },
});

export const MatchButton = styled(Button)({
  backgroundColor: '#B19CD9',
  color: 'white',
  '&:hover': {
    backgroundColor: '#9E8BC0',
  },
});

export const StudyGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '24px',
  marginTop: '24px',
});

export const Card = styled(Box)({
  borderRadius: '12px',
  padding: '16px',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

export const StudyInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const StudyTitle = styled('h3')({
  margin: '0 0 8px 0',
  fontSize: '1.1rem',
  color: '#2C3E50',
});

export const PaginationStyled = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',
  '& .MuiPaginationItem-root': {
    color: '#B19CD9',
  },
  '& .Mui-selected': {
    backgroundColor: '#B19CD9 !important',
    color: 'white',
  },
});

export const ChipStyled = {
  backgroundColor: '#F2ECFF',
  color: '#B19CD9',
  marginRight: '8px',
  marginBottom: '8px',
};

export const StyledDialog = (props) => (
  <Dialog
    {...props}
    sx={{
      '& .MuiDialog-paper': {
        borderRadius: '12px',
        padding: '16px',
      }
    }}
  />
);

export const DialogActionButton = styled(Button)({
  backgroundColor: '#B19CD9',
  color: 'white',
  '&:hover': {
    backgroundColor: '#9E8BC0',
  },
});

export const RejectButton = styled(Button)({
  color: '#ff4444',
  borderColor: '#ff4444',
  '&:hover': {
    backgroundColor: '#fff0f0',
    borderColor: '#ff4444',
  },
});

// Form 관련 스타일
export const FormContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '16px',
});

export const FormField = styled(Box)({
  marginBottom: '16px',
});

export const DetailContainer = styled(Box)({
  padding: '24px',
});

export const DetailHeader = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '24px',
});

export const DetailContent = styled(Box)({
  marginBottom: '24px',
});

export const MemberList = styled(Box)({
  marginTop: '24px',
});

export const MemberItem = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 0',
  borderBottom: '1px solid #eee',
});

