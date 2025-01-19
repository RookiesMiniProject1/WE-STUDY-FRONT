import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Tabs,
  Tab
} from '@mui/material';
import { StyledDialog, DialogActionButton } from '../styles/StudyGroupStyles';
import axios from '../api/axios';

const RequestManagement = ({ open, onClose, groupId, selectedGroup, onRequestProcessed }) => {
  const [activeTab, setActiveTab] = useState('study');
  const [loading, setLoading] = useState(false);

  const handleApprove = async (type) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      const requestId = selectedGroup?.pendingRequests?.[0]?.userId; // 첫 번째 대기 중인 요청 사용

      if (!requestId) {
        alert('처리할 요청이 없습니다.');
        return;
      }
      
      if (type === 'study') {
        await axios.post(
          `/api/groups/${selectedGroup?.id}/join/${requestId}/approve`,
          {},
          { headers: { Authorization: `Bearer ${token}` }}
        );
      } else {
        await axios.post(
          `/api/groups/${selectedGroup?.id}/mentor-request/${requestId}/approve`,
          {},
          { headers: { Authorization: `Bearer ${token}` }}
        );
      }
      
      alert(`${type === 'study' ? '가입' : '멘토'} 요청이 승인되었습니다.`);
      if (onRequestProcessed) onRequestProcessed();
      onClose(); // 처리 후 모달 닫기
    } catch (error) {
      if (error.response?.status === 403) {
        alert('승인 권한이 없습니다.');
      } else {
        alert(`${type === 'study' ? '가입' : '멘토'} 요청 승인 중 오류가 발생했습니다.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (type) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      const requestId = selectedGroup?.pendingRequests?.[0]?.userId; // 첫 번째 대기 중인 요청 사용

      if (!requestId) {
        alert('처리할 요청이 없습니다.');
        return;
      }
      
      if (type === 'study') {
        await axios.post(
          `/api/groups/${selectedGroup?.id}/join/${requestId}/reject`,
          {},
          { headers: { Authorization: `Bearer ${token}` }}
        );
      } else {
        await axios.post(
          `/api/groups/${selectedGroup?.id}/mentor-request/${requestId}/reject`,
          {},
          { headers: { Authorization: `Bearer ${token}` }}
        );
      }
      
      alert(`${type === 'study' ? '가입' : '멘토'} 요청이 거절되었습니다.`);
      if (onRequestProcessed) onRequestProcessed();
      onClose(); 
    } catch (error) {
      if (error.response?.status === 403) {
        alert('거절 권한이 없습니다.');
      } else {
        alert(`${type === 'study' ? '가입' : '멘토'} 요청 거절 중 오류가 발생했습니다.`);
      }
    } finally {
      setLoading(false);
    }
  };

  const currentUserEmail = localStorage.getItem('userEmail');
  const isLeader = selectedGroup?.members?.some(
    member => member.email === currentUserEmail && member.role === 'LEADER'
  );
  const isMentor = selectedGroup?.members?.some(
    member => member.email === currentUserEmail && member.role === 'MENTOR'
  );

  // 현재 처리할 요청 정보 가져오기
  const currentRequest = selectedGroup?.pendingRequests?.[0];

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            {isLeader && <Tab label="스터디 가입 요청" value="study" />}
            {(isLeader || isMentor) && <Tab label="멘토 요청" value="mentor" />}
          </Tabs>
        </Box>
      </DialogTitle>
      <DialogContent>
        {loading ? (
          <Typography sx={{ color: '#637381', textAlign: 'center', py: 3 }}>
            처리 중...
          </Typography>
        ) : currentRequest ? (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              처리할 요청
            </Typography>
            <Typography sx={{ mb: 3 }}>
              요청자: {currentRequest.email}
            </Typography>
            <Typography sx={{ mb: 3, color: '#637381' }}>
              요청일: {new Date(currentRequest.requestedAt).toLocaleDateString()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => handleApprove(activeTab)}
                disabled={loading}
                sx={{
                  backgroundColor: '#B19CD9',
                  '&:hover': { backgroundColor: '#9E8BC0' }
                }}
              >
                승인
              </Button>
              <Button
                variant="contained"
                onClick={() => handleReject(activeTab)}
                disabled={loading}
                sx={{
                  backgroundColor: '#FFE7E7',
                  color: '#FF4842',
                  '&:hover': { backgroundColor: '#FFD4D4' }
                }}
              >
                거절
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography sx={{ color: '#637381', textAlign: 'center', py: 3 }}>
            처리할 요청이 없습니다.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <DialogActionButton onClick={onClose}>
          닫기
        </DialogActionButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default RequestManagement;