import React, { useState, useEffect } from 'react';
import {
  TextField, 
  Typography, 
  Chip, 
  InputAdornment, 
  Pagination, 
  Stack,
  Box,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GroupsIcon from '@mui/icons-material/Groups';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import { 
  Container, 
  Header, 
  SearchContainer, 
  CreateButton, 
  StudyGrid, 
  Card, 
  StudyInfo, 
  StudyTitle,
  PaginationStyled,
  ChipStyled
} from '../styles/StudyGroupStyles';
import CreateStudyGroup from '../components/CreateStudyGroup';
import StudyGroupDetail from '../components/StudyGroupDetail';
import StudyList from '../components/StudyList';
import axios from '../api/axios';

const StudyGroupPage = () => {
  const [studyGroups, setStudyGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [showMyStudies, setShowMyStudies] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchStudyGroups();
  }, []);

  const fetchStudyGroups = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('jwt');
      const response = await axios.get('/api/groups', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStudyGroups(response.data);
    } catch (error) {
      console.error('스터디 목록 조회 실패:', error);
      setStudyGroups([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudy = () => {
    setOpenModal(true);
  };

  const handleCloseModal = (shouldRefresh = false) => {
    setOpenModal(false);
    if (shouldRefresh) {
      fetchStudyGroups();
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCardClick = async (groupId) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get(`/api/groups/${groupId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSelectedGroup(response.data);
      setDetailModalOpen(true);
    } catch (error) {
      console.error('스터디 상세 정보 조회 실패:', error);
    }
  };

  const handleToggleMyStudies = () => {
    setShowMyStudies(!showMyStudies);
  };

  const StudyCard = ({ study }) => {
    const currentUserEmail = localStorage.getItem('userEmail');
    
    const isMember = study.members?.some(
      member => member.email === currentUserEmail
    );

    const handleJoinRequest = async (e) => {
      e.stopPropagation();
      
      try {
        const token = localStorage.getItem('jwt');
        await axios.post(`/api/groups/${study.id}/join/request`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        alert('가입 요청이 완료되었습니다.');
        fetchStudyGroups();
      } catch (error) {
        if (error.response?.status === 400) {
          alert(error.response.data.message || '가입 요청을 할 수 없습니다.');
        } else {
          alert('가입 요청 중 오류가 발생했습니다.');
        }
      }
    };

    return (
      <Card elevation={1} onClick={() => handleCardClick(study.id)}>
        <StudyInfo>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <GroupsIcon sx={{ fontSize: 40, color: '#B19CD9' }} />
            <div>
              <StudyTitle>{study.title || '제목 없음'}</StudyTitle>
              <Typography variant="body2" color="#637381">
                {study.description || '설명 없음'}
              </Typography>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '1rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <div>
              <Chip 
                label={`${study.currentMember}/${study.maxMembers}명`} 
                size="small" 
                sx={ChipStyled}
              />
              <Chip 
                label={study.mentorEmail || '멘토 미배정'} 
                size="small"
                sx={ChipStyled}
              />
              {study.status && (
                <Chip 
                  label={study.status}
                  size="small"
                  sx={{ ...ChipStyled, marginLeft: '0.5rem' }}
                />
              )}
            </div>
            
            {!isMember && 
             study.isRecruiting && 
             study.currentMember < study.maxMembers && (
              <CreateButton
                variant="contained"
                onClick={handleJoinRequest}
                size="small"
                sx={{ 
                  minWidth: 'auto', 
                  padding: '4px 12px'
                }}
              >
                참여 신청
              </CreateButton>
            )}
          </div>
        </StudyInfo>
      </Card>
    );
  };

  const filteredStudyGroups = studyGroups.filter(study => {
    return searchTerm === '' || 
           study.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
           study.description?.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const paginatedStudyGroups = filteredStudyGroups.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const pageCount = Math.ceil(filteredStudyGroups.length / itemsPerPage);

  if (loading) return (
    <Container>
      <Typography variant="h6" textAlign="center" color="#637381">
        스터디 정보를 불러오는 중...
      </Typography>
    </Container>
  );

  return (
    <Container>
      <Header>
        <SearchContainer>
          <TextField
            fullWidth
            placeholder="스터디 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#B19CD9' }} />
                </InputAdornment>
              ),
            }}
          />
        </SearchContainer>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <CreateButton 
            variant="contained" 
            startIcon={showMyStudies ? <GroupsIcon /> : <PersonIcon />}
            onClick={handleToggleMyStudies}
          >
            {showMyStudies ? '전체 스터디 그룹' : '내 스터디 그룹'}
          </CreateButton>
          <CreateButton 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleCreateStudy}
          >
            스터디 만들기
          </CreateButton>
        </div>
      </Header>

      {showMyStudies ? (
        <StudyList />
      ) : (
        <>
          <StudyGrid>
            {paginatedStudyGroups.map(study => (
              <StudyCard key={study.id} study={study} />
            ))}
          </StudyGrid>

          <Stack spacing={2} alignItems="center" sx={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <PaginationStyled>
              <Pagination 
                count={pageCount}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </PaginationStyled>
          </Stack>
        </>
      )}

      <CreateStudyGroup 
        open={openModal} 
        onClose={handleCloseModal}
      />

      <StudyGroupDetail
        open={detailModalOpen}
        onClose={() => {
          setDetailModalOpen(false);
          fetchStudyGroups();
        }}
        studyGroup={selectedGroup}
        onGroupUpdated={fetchStudyGroups}
      />
    </Container>
  );
};

export default StudyGroupPage;