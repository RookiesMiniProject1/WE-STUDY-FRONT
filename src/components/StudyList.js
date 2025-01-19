import React, { useState, useEffect } from 'react';
import {
  Typography,
  Tab,
  Button,
  Avatar,
  Box,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import axios from '../api/axios';
import StudyGroupDetail from '../components/StudyGroupDetail';
import {
  Container,
  StyledTabs,
  StudyGrid,
  StudyCard,
  StudyListItem,
  StatusChip,
  RequestBadge,
  EmptyMessage,
  RequestActions,
  ApproveButton,
  RejectButton,
} from '../styles/StudyListStyles';

const StudyList = () => {
  const [activeTab, setActiveTab] = useState('APPROVED');
  const [studies, setStudies] = useState({
    APPROVED: [],
    PENDING: [],
    REJECTED: [],
    REQUESTS: [],
  });
  const [loading, setLoading] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const fetchStudies = async (status) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`/api/groups/my-groups?status=${status}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('스터디 목록 조회 실패:', error);
      return [];
    }
  };

  const fetchAllStudies = async () => {
    try {
      setLoading(true);
      const [approved, pending, rejected] = await Promise.all([
        fetchStudies('APPROVED'),
        fetchStudies('PENDING'),
        fetchStudies('REJECTED'),
      ]);
      
      const requests = approved.filter(study => 
        study.members?.some(member => 
          member.email === localStorage.getItem('userEmail') && 
          member.role === 'LEADER'
        ) && 
        study.pendingRequests?.length > 0
      );

      setStudies({
        APPROVED: approved,
        PENDING: pending,
        REJECTED: rejected,
        REQUESTS: requests,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudies();
  }, []);

  const handleApprove = async (groupId, requestId) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.post(`/api/groups/${groupId}/join/${requestId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('가입 요청이 승인되었습니다.');
      fetchAllStudies();
    } catch (error) {
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (groupId, requestId) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.post(`/api/groups/${groupId}/join/${requestId}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('가입 요청이 거절되었습니다.');
      fetchAllStudies();
    } catch (error) {
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCardClick = async (studyId) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`/api/groups/${studyId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedGroup(response.data);
      setDetailModalOpen(true);
    } catch (error) {
      console.error('스터디 상세 정보 조회 실패:', error);
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'APPROVED':
        return '가입됨';
      case 'PENDING':
        return '승인중';
      case 'REJECTED':
        return '거절됨';
      default:
        return status;
    }
  };

  const renderStudyList = (studyList) => (
    <Box>
      {studyList.length > 0 ? (
        <StudyGrid>
          {studyList.map((study) => (
            <StudyCard 
              key={study.id}
              onClick={() => handleCardClick(study.id)}
            >
              <Box sx={{ height: '130px', display: 'flex', flexDirection: 'column' }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 1,
                    fontSize: '1rem',
                    fontWeight: 700,
                  }}
                >
                  {study.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="textSecondary"
                  sx={{ 
                    mb: 2,
                    height: '32px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                  }}
                >
                  {study.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mt: 'auto'
                }}>
                  <Typography 
                    variant="body2" 
                    color="textSecondary" 
                    sx={{ 
                      fontSize: '0.875rem',
                      fontWeight: 600
                    }}
                  >
                    멤버: {study.currentMember}/{study.maxMembers}
                  </Typography>
                  <StatusChip status={activeTab}>
                    {getStatusText(activeTab)}
                  </StatusChip>
                </Box>
              </Box>
            </StudyCard>
          ))}
        </StudyGrid>
      ) : (
        <EmptyMessage>
          {activeTab === 'APPROVED' && '가입된 스터디가 없습니다.'}
          {activeTab === 'PENDING' && '승인 대기중인 스터디가 없습니다.'}
          {activeTab === 'REJECTED' && '거절된 스터디가 없습니다.'}
        </EmptyMessage>
      )}
    </Box>
  );

  const renderRequestList = () => (
    <Box>
      {studies.REQUESTS.length > 0 ? (
        studies.REQUESTS.map((study) => (
          <Box key={study.id} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>{study.title}</Typography>
            {study.pendingRequests.map((request) => (
              <StudyListItem key={request.userId}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ mr: 2, bgcolor: '#B19CD9' }}>
                    <PersonIcon />
                  </Avatar>
                  <Box>
                    <Typography>{request.email}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(request.requestedAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <RequestActions>
                  <ApproveButton
                    variant="contained"
                    size="small"
                    onClick={() => handleApprove(study.id, request.userId)}
                  >
                    승인
                  </ApproveButton>
                  <RejectButton
                    variant="contained"
                    size="small"
                    onClick={() => handleReject(study.id, request.userId)}
                  >
                    거절
                  </RejectButton>
                </RequestActions>
              </StudyListItem>
            ))}
          </Box>
        ))
      ) : (
        <EmptyMessage>
          처리할 가입 요청이 없습니다.
        </EmptyMessage>
      )}
    </Box>
  );

  if (loading) {
    return <Typography>로딩 중...</Typography>;
  }

  return (
    <Container>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          fontSize: '1.2rem',
          fontWeight: 700,
        }}
      >
        내 스터디 그룹
      </Typography>
      <StyledTabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
      >
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              가입된 스터디
              {studies.APPROVED.length > 0 && (
                <RequestBadge>{studies.APPROVED.length}</RequestBadge>
              )}
            </Box>
          }
          value="APPROVED"
        />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              승인 대기중
              {studies.PENDING.length > 0 && (
                <RequestBadge>{studies.PENDING.length}</RequestBadge>
              )}
            </Box>
          }
          value="PENDING"
        />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              거절됨
              {studies.REJECTED.length > 0 && (
                <RequestBadge>{studies.REJECTED.length}</RequestBadge>
              )}
            </Box>
          }
          value="REJECTED"
        />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              가입 요청 관리
              {studies.REQUESTS.reduce((total, study) => 
                total + (study.pendingRequests?.length || 0), 0) > 0 && (
                <RequestBadge>
                  {studies.REQUESTS.reduce((total, study) => 
                    total + (study.pendingRequests?.length || 0), 0)}
                </RequestBadge>
              )}
            </Box>
          }
          value="REQUESTS"
        />
      </StyledTabs>

      {activeTab === 'REQUESTS' ? 
        renderRequestList() : 
        renderStudyList(studies[activeTab])}

      <StudyGroupDetail
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          setSelectedGroup(null);
        }}
        studyGroup={selectedGroup}
        onGroupUpdated={fetchAllStudies}
      />
    </Container>
  );
};

export default StudyList;