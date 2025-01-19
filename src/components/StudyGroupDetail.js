import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider,
  styled,
  TextField,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from '../api/axios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '12px',
    maxWidth: '600px',
    width: '100%'
  }
}));

const HeaderSection = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  marginBottom: '24px'
});

const ActionButton = styled(Button)({
  backgroundColor: '#B19CD9',
  color: 'white',
  '&:hover': {
    backgroundColor: '#9E8BC0',
  },
  '&.Mui-disabled': {
    backgroundColor: '#E0E0E0',
  }
});

const StudyGroupDetail = ({ open, onClose, studyGroup, onGroupUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(null);
  
  useEffect(() => {
    if (studyGroup) {
      setEditedData({
        title: studyGroup.title,
        description: studyGroup.description,
        maxMembers: studyGroup.maxMembers
      });
    }
  }, [studyGroup]);

  if (!studyGroup) return null;

  const userEmail = localStorage.getItem('userEmail');
  const isMember = studyGroup.members?.some(member => member.email === userEmail);
  const isLeader = studyGroup.members?.some(
    member => member.role === 'LEADER' && member.email === userEmail
  );

  const handleEdit = async () => {
    try {
      if (!editedData) return;

      const token = localStorage.getItem('jwt');
      const response = await axios.put(`/api/groups/${studyGroup.id}`, {
        title: editedData.title,
        description: editedData.description,
        maxMembers: parseInt(editedData.maxMembers)
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        alert('스터디 그룹이 성공적으로 수정되었습니다.');
        setEditedData(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating group:', error);
      alert(`수정 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 스터디 그룹을 삭제하시겠습니까?')) {
      try {
        const token = localStorage.getItem('jwt');
        await axios.delete(`/api/groups/${studyGroup.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onClose();
        onGroupUpdated();
      } catch (error) {
        console.error('Error deleting group:', error);
        alert('스터디 그룹 삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const handleJoinRequest = async () => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.post(`/api/groups/${studyGroup.id}/join/request`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('가입 신청이 완료되었습니다.');
      onGroupUpdated();
    } catch (error) {
      console.error('Error requesting to join:', error);
      alert('가입 신청 중 오류가 발생했습니다.');
    }
  };

  const handleLeave = async () => {
    if (window.confirm('정말로 이 스터디 그룹을 탈퇴하시겠습니까?')) {
      try {
        const token = localStorage.getItem('jwt');
        await axios.delete(`/api/groups/${studyGroup.id}/leave`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        onClose();
        onGroupUpdated();
      } catch (error) {
        console.error('Error leaving group:', error);
        alert('그룹 탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  const handleLeaderChange = async (newLeaderId) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.put(`/api/groups/${studyGroup.id}/leader`, 
        { newLeaderId },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      alert('리더 권한이 이전되었습니다.');
      onGroupUpdated();
    } catch (error) {
      console.error('Error changing leader:', error);
      alert('리더 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ 
        borderBottom: '1px solid #eee', 
        padding: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        스터디 상세 정보
        {isLeader && (
          <Box>
            <IconButton onClick={() => setIsEditing(!isEditing)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </DialogTitle>

      <DialogContent sx={{ padding: '24px' }}>
        {isEditing ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="제목"
              value={editedData?.title || ''}
              onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
              fullWidth
            />
            <TextField
              label="설명"
              multiline
              rows={4}
              value={editedData?.description || ''}
              onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
              fullWidth
            />
            <TextField
              label="최대 인원"
              type="number"
              value={editedData?.maxMembers || ''}
              onChange={(e) => setEditedData({ ...editedData, maxMembers: e.target.value })}
              fullWidth
            />
            <Button 
              onClick={handleEdit} 
              variant="contained" 
              sx={{ backgroundColor: '#B19CD9' }}
            >
              수정 완료
            </Button>
          </Box>
        ) : (
          <>
            <HeaderSection>
              <GroupsIcon sx={{ fontSize: 40, color: '#B19CD9' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {studyGroup.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {studyGroup.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <Chip 
                    icon={<GroupsIcon />}
                    label={`${studyGroup.currentMember}/${studyGroup.maxMembers}명`}
                    sx={{ backgroundColor: '#F2ECFF', color: '#B19CD9' }}
                  />
                  <Chip 
                    icon={<PersonIcon />}
                    label={`멘토: ${studyGroup.mentorEmail}`}
                    sx={{ backgroundColor: '#F2ECFF', color: '#B19CD9' }}
                  />
                  <Chip 
                    icon={<AccessTimeIcon />}
                    label="PREPARING"
                    sx={{ backgroundColor: '#F2ECFF', color: '#B19CD9' }}
                  />
                </Box>
              </Box>
            </HeaderSection>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" gutterBottom>
              멤버 목록
            </Typography>
            <List>
              {studyGroup.members?.map((member) => (
                <ListItem 
                  key={member.userId}
                  secondaryAction={
                    isLeader && member.role !== 'LEADER' && (
                      <Button
                        size="small"
                        onClick={() => handleLeaderChange(member.userId)}
                        sx={{ color: '#B19CD9' }}
                      >
                        리더 위임
                      </Button>
                    )
                  }
                >
                  <ListItemText
                    primary={member.email}
                    secondary={`역할: ${member.role === 'LEADER' ? '리더' : '멤버'} | 참여일: ${new Date(member.joinedAt).toLocaleDateString()}`}
                  />
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
        {!isMember && (
          <ActionButton
            variant="contained"
            onClick={handleJoinRequest}
            disabled={studyGroup.currentMember >= studyGroup.maxMembers}
          >
            참여 신청
          </ActionButton>
        )}
        {isMember && !isLeader && (
          <ActionButton
            variant="contained"
            onClick={handleLeave}
            sx={{ backgroundColor: '#ff4444', '&:hover': { backgroundColor: '#cc0000' } }}
          >
            그룹 탈퇴
          </ActionButton>
        )}
        <Button
          onClick={onClose}
          sx={{ color: '#637381' }}
        >
          닫기
        </Button>
      </Box>
    </StyledDialog>
  );
};

export default StudyGroupDetail;