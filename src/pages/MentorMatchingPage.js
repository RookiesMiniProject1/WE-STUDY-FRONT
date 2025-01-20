import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import {
  MenuItem,
  Typography,
  Box,
  Pagination,
} from '@mui/material';
import {
  Container,
  Content,
  MentorGrid,
  FilterContainer,
  FilterTitle,
  FilterGroup,
  FilterLabel,
  Card,
  ProfileSection,
  ProfileInfo,
  Name,
  Career,
  TechSection,
  TechStack,
  TechTag,
  ContactButton,
  PaginationContainer,
  PaginationStyled,
  SelectStyle,
  TechStackContainer,
  TechStackButton,
  ProfileIcon,
  EmailText
} from '../styles/MentorMatchingStyles';

const techStackOptions = [
  'JavaScript', 'React', 'HTML/CSS', 'Java', 'Spring', 
  'Python', 'Node.js', 'C++', 'MySQL', 'MongoDB', 
  'Redis', 'AWS', 'Docker', 'Kubernetes', 'Git', 
  'Android', 'iOS', 'Flutter'
];

const getCareerRange = (years) => {
  const year = parseInt(years);
  if (year <= 3) return '1-3';
  if (year <= 6) return '4-6';
  if (year <= 9) return '7-9';
  return '10+';
};

const getCareerText = (career) => {
  if (!career) return '';
  const matches = career.match(/\d+/);
  if (!matches) return career;
  return `${matches[0]}년차`;
};

const ITEMS_PER_PAGE = 4;

const MentorMatchingPage = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    career: '',
    techStack: []
  });
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [selectedGroupId, setSelectedGroupId] = useState('');
  const [groups, setGroups] = useState([]);
  const [mentorRequests, setMentorRequests] = useState([]);
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    fetchMentors();
    fetchGroups();
    checkIsMentor();
  }, []);

  const checkIsMentor = async () => {
    try {
      const response = await axios.get('/api/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setIsMentor(response.data.role === 'MENTOR');
      if (response.data.role === 'MENTOR') {
        fetchMentorRequests();
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
    }
  };

  const fetchMentorRequests = async () => {
    try {
      const response = await axios.get('/api/groups/mentor-requests', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMentorRequests(response.data);
    } catch (error) {
      console.error('멘토 요청 목록 조회 실패:', error);
    }
  };

  const handleApprove = async (groupId) => {
    try {
      await axios.post(`/api/groups/${groupId}/mentor-request/${localStorage.getItem('userId')}/approve`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('멘토 매칭 요청을 승인했습니다.');
      fetchMentorRequests();
    } catch (error) {
      console.error('매칭 요청 승인 실패:', error);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  const handleReject = async (groupId) => {
    try {
      await axios.post(`/api/groups/${groupId}/mentor-request/${localStorage.getItem('userId')}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('멘토 매칭 요청을 거절했습니다.');
      fetchMentorRequests();
    } catch (error) {
      console.error('매칭 요청 거절 실패:', error);
      alert('요청 처리 중 오류가 발생했습니다.');
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('/api/groups/my-groups', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setGroups(response.data);
    } catch (error) {
      console.error('그룹 목록 조회 실패:', error);
    }
  };

  const fetchMentors = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get('/api/groups/mentors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setMentors(response.data);
    } catch (error) {
      console.error('멘토 목록 조회 실패:', error);
      setError('멘토 정보를 불러오는데 실패했습니다.');
      setMentors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (type, value, checked) => {
    if (type === 'career') {
      setFilters(prev => ({ ...prev, career: value }));
      setPage(1);
    } else if (type === 'tech') {
      setFilters(prev => ({
        ...prev,
        techStack: checked
          ? [...prev.techStack, value]
          : prev.techStack.filter(tech => tech !== value)
      }));
      setPage(1);
    }
  };

  const handleMatchingRequest = async (mentorId) => {
    if (!selectedGroupId) {
      alert('매칭을 요청할 그룹을 선택해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `/api/groups/${selectedGroupId}/mentor-request/${mentorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data) {
        alert(`멘토에게 매칭 요청을 보냈습니다. 멘토의 수락을 기다려주세요.`);
        fetchGroups();
      }
    } catch (error) {
      console.error('매칭 요청 실패:', error);
      
      if (error.response?.status === 400) {
        alert('이미 매칭 요청을 보냈거나, 이미 멘토가 있는 스터디입니다.');
      } else if (error.response?.status === 404) {
        alert('멘토를 찾을 수 없거나 스터디 그룹이 존재하지 않습니다.');
      } else {
        alert('매칭 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  const filteredMentors = mentors.filter(mentor => {
    if (filters.career) {
      const careerYears = parseInt(mentor.career.match(/\d+/)?.[0] || '0');
      const careerRange = getCareerRange(careerYears.toString());
      if (careerRange !== filters.career) {
        return false;
      }
    }

    if (filters.techStack.length > 0) {
      const mentorTechStack = mentor.techStack.split(',').map(tech => tech.trim());
      return filters.techStack.every(tech => mentorTechStack.includes(tech));
    }

    return true;
  });

  const paginatedMentors = filteredMentors.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const pageCount = Math.ceil(filteredMentors.length / ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FilterSection = () => (
    <FilterContainer elevation={1}>
      <FilterTitle>멘토 찾기</FilterTitle>

      <FilterGroup>
        <FilterLabel>스터디 그룹 선택</FilterLabel>
        <SelectStyle
          fullWidth
          size="small"
          value={selectedGroupId}
          onChange={(e) => setSelectedGroupId(e.target.value)}
          displayEmpty
        >
          <MenuItem disabled value="">
            <em>그룹을 선택하세요</em>
          </MenuItem>
          {groups.map((group) => (
            <MenuItem 
              key={group.id} 
              value={group.id}
              disabled={group.mentorId !== null}
            >
              {group.title} {group.mentorId ? '(멘토 매칭 완료)' : '(멘토 매칭 필요)'}
            </MenuItem>
          ))}
        </SelectStyle>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>경력</FilterLabel>
        <SelectStyle
          fullWidth
          size="small"
          value={filters.career}
          onChange={(e) => handleFilterChange('career', e.target.value)}
          displayEmpty
        >
          <MenuItem disabled value="">
            <em>경력을 선택하세요</em>
          </MenuItem>
          <MenuItem value="">전체</MenuItem>
          <MenuItem value="1-3">1-3년</MenuItem>
          <MenuItem value="4-6">4-6년</MenuItem>
          <MenuItem value="7-9">7-9년</MenuItem>
          <MenuItem value="10+">10년 이상</MenuItem>
        </SelectStyle>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel>기술 스택</FilterLabel>
        <TechStackContainer>
          {techStackOptions.map((tech) => (
            <TechStackButton
              key={tech}
              onClick={() => handleFilterChange('tech', tech, !filters.techStack.includes(tech))}
              isSelected={filters.techStack.includes(tech)}
            >
              {tech}
            </TechStackButton>
          ))}
        </TechStackContainer>
      </FilterGroup>
    </FilterContainer>
  );

  const MentorCard = ({ mentor }) => (
    <Card elevation={1}>
      <ProfileSection>
        <ProfileIcon />
        <ProfileInfo>
          <Name>멘토 ID: {mentor.userId}</Name>
          <EmailText variant="body2">
            이메일: {mentor.email}
          </EmailText>
          <Career>경력: {getCareerText(mentor.career)}</Career>
        </ProfileInfo>
      </ProfileSection>

      <TechSection>
        <FilterLabel>기술 스택</FilterLabel>
        <TechStack>
          {mentor.techStack.split(',').map((tech, index) => (
            <TechTag key={index}>{tech.trim()}</TechTag>
          ))}
        </TechStack>
      </TechSection>

      <ContactButton 
        variant="contained"
        onClick={() => handleMatchingRequest(mentor.userId)}
        disabled={!selectedGroupId || groups.find(g => g.id === selectedGroupId)?.mentorId}
        sx={{
          backgroundColor: !selectedGroupId ? 'grey.400' : 'primary.main',
          '&:hover': {
            backgroundColor: !selectedGroupId ? 'grey.500' : 'primary.dark'
          }
        }}
      >
        {!selectedGroupId 
          ? '스터디 그룹 선택 필요'
          : groups.find(g => g.id === selectedGroupId)?.mentorId 
            ? '이미 멘토가 있는 스터디입니다'
            : '매칭 요청'}
      </ContactButton>
    </Card>
  );

  if (loading) return (
    <Container>
      <Typography variant="h6" textAlign="center" color="#637381">
        멘토 정보를 불러오는 중...
      </Typography>
    </Container>
  );

  if (error) return (
    <Container>
      <Typography variant="h6" textAlign="center" color="error">
        {error}
      </Typography>
    </Container>
  );

  return (
    <Container>
      <Content>
        <FilterSection />
        <Box sx={{ flex: 1 }}>
          <MentorGrid>
            {paginatedMentors.map(mentor => (
              <MentorCard key={mentor.userId} mentor={mentor} />
            ))}
          </MentorGrid>
        </Box>
      </Content>
      
      <PaginationContainer>
        <PaginationStyled>
          <Pagination 
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </PaginationStyled>
      </PaginationContainer>
  </Container>
);
};

export default MentorMatchingPage