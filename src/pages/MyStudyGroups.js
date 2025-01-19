import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';

function MyStudyGroups() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyGroups();
  }, []);

  const fetchMyGroups = async () => {
    try {
      const response = await axios.get('/api/groups/my-groups', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setGroups(response.data);
    } catch (error) {
      console.error('스터디 그룹 조회 실패:', error);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setOpenDialog(true);
  };

  const handleManageGroup = () => {
    setOpenDialog(false);
    navigate(`/study-group/${selectedGroup.id}`);
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        내 스터디 그룹
      </Typography>
      <Grid container spacing={3}>
        {groups.map((group) => (
          <Grid item xs={12} sm={6} md={4} key={group.id}>
            <Card 
              sx={{ 
                cursor: 'pointer',
                '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' }
              }}
              onClick={() => handleGroupClick(group)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {group.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {group.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <GroupIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {group.currentMember}/{group.maxMembers} 명
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PersonIcon sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    멘토: {group.mentorEmail}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={group.isRecruiting ? '모집중' : '모집완료'} 
                    color={group.isRecruiting ? 'success' : 'default'}
                    size="small"
                  />
                  <Chip 
                    label={group.status} 
                    color="primary"
                    size="small"
                    sx={{ ml: 1 }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>스터디 그룹 관리</DialogTitle>
        <DialogContent>
          <Typography>
            "{selectedGroup?.title}" 스터디 그룹을 관리하시겠습니까?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>취소</Button>
          <Button onClick={handleManageGroup} variant="contained" color="primary">
            관리하기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyStudyGroups;