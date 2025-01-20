import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Box,
  InputAdornment,
  Table,
  Select,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import {
  MainContainer,
  StyledPaper,
  ActionButton,
  SearchBox,
  TableContainer,
  StyledFormControl,
  Header,
  PageTitle,
  StyledTextField
} from '../styles/OpinionStyles';
import OpinionDetail from './OpinionDetail';

function Opinion() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myGroups, setMyGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState('list');
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [openWriteModal, setOpenWriteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [groupsRes, postsRes] = await Promise.all([
        axios.get("/api/groups/my-groups"),
        axios.get("/api/posts")
      ]);

      setMyGroups(groupsRes.data);
      setPosts(postsRes.data.filter(post => post.boardType === "DISCUSSION"));
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostClick = (postId) => {
    setSelectedPostId(postId);
    setView('detail');
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedPostId(null);
    fetchInitialData();
  };

  const handleAddClick = () => {
    setOpenWriteModal(true);
  };

  const handleWriteSubmit = async () => {
    try {
      const data = {
        title,
        content,
        boardType: "DISCUSSION",
      };

      if (selectedGroupId !== 0) {
        data.groupId = selectedGroupId;
      }

      await axios.post('/api/posts', data);
      setOpenWriteModal(false);
      setTitle("");
      setContent("");
      fetchInitialData();
    } catch (error) {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  const filteredPosts = posts.filter(post => 
    (selectedGroupId === 0 || post.groupId === selectedGroupId) &&
    (post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     post.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const paginatedPosts = filteredPosts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <MainContainer>
        <Typography variant="h6" textAlign="center" color="#637381">
          정보를 불러오는 중...
        </Typography>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {view === 'list' ? (
        <>
          <PageTitle>의견 공유 게시판</PageTitle>

          <Header>
            <SearchBox>
              <TextField
                placeholder="제목이나 내용으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#B19CD9' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </SearchBox>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <StyledFormControl size="small">
                <Select
                  value={selectedGroupId}
                  onChange={(e) => setSelectedGroupId(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value={0}>전체 게시판</MenuItem>
                  {myGroups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.title}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              <ActionButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
              >
                글쓰기
              </ActionButton>
            </Box>
          </Header>

          <StyledPaper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="10%">번호</TableCell>
                    <TableCell width="50%">제목</TableCell>
                    <TableCell width="20%">작성자</TableCell>
                    <TableCell width="20%">작성일</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedPosts.length > 0 ? (
                    paginatedPosts.map((post, index) => (
                      <TableRow 
                        key={post.id}
                        onClick={() => handlePostClick(post.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>{(page - 1) * ITEMS_PER_PAGE + index + 1}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {post.title}
                            {post.comments.length > 0 && (
                              <Chip
                                label={post.comments.length}
                                size="small"
                                sx={{
                                  ml: 1,
                                  backgroundColor: 'rgba(177, 156, 217, 0.2)',
                                  color: '#6A1B9A',
                                }}
                              />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>{post.authorEmail.split("@")[0]}</TableCell>
                        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Typography color="textSecondary">
                          게시글이 없습니다. 새로운 글을 작성해보세요.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </>
      ) : (
        <OpinionDetail
          postId={selectedPostId}
          onBack={handleBackToList}
        />
      )}

      <Dialog 
        open={openWriteModal} 
        onClose={() => setOpenWriteModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>새 게시글 작성</DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            label="제목"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <StyledTextField
            label="내용"
            multiline
            rows={6}
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <ActionButton onClick={() => setOpenWriteModal(false)}>
            취소
          </ActionButton>
          <ActionButton 
            onClick={handleWriteSubmit}
            disabled={!title.trim() || !content.trim()}
          >
            작성
          </ActionButton>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
}

export default Opinion;