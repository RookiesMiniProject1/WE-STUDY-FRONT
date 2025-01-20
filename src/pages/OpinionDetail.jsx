import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import {
  Typography,
  Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  DetailContainer,
  PostPaper,
  PostHeader,
  PostTitle,
  PostInfo,
  PostContent,
  ActionButton,
  CommentSection,
  CommentTitle,
  CommentCard,
  CommentInput,
  ButtonGroup,
  BackButton,
  Divider,
  StyledTextField
} from '../styles/OpinionDetailStyles';

function OpinionDetail({ postId, onBack }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchData();
  }, [postId]);

  const fetchData = async () => {
    try {
      const [postRes, userRes] = await Promise.all([
        axios.get(`/api/posts/${postId}`),
        axios.get('/api/users/profile')
      ]);

      setPost(postRes.data);
      setUserId(userRes.data.data.userId);
      setComments(postRes.data.comments || []);

    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      alert("게시글을 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditStart = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.put(`/api/posts/${postId}`, {
        title: editTitle,
        content: editContent
      });

      setPost({
        ...post,
        title: response.data.title,
        content: response.data.content,
        updatedAt: response.data.updatedAt
      });
      setIsEditing(false);
    } catch (error) {
      console.error('게시글 수정 실패:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await axios.post(`/api/posts/${postId}/comments`, {
        content: newComment,
      });
      fetchData(); // 댓글 추가 후 데이터 새로고침
      setNewComment('');
    } catch (error) {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
      fetchData(); // 댓글 삭제 후 데이터 새로고침
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/api/posts/${postId}`);
      onBack();
    } catch (error) {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <DetailContainer>
        <Typography variant="h6" textAlign="center" color="#637381">
          정보를 불러오는 중...
        </Typography>
      </DetailContainer>
    );
  }

  if (!post) {
    return (
      <DetailContainer>
        <Typography variant="h6" textAlign="center" color="error">
          게시글을 찾을 수 없습니다.
        </Typography>
        <BackButton 
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
        >
          목록으로
        </BackButton>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton 
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
      >
        목록으로
      </BackButton>

      <PostPaper>
        {!isEditing ? (
          <>
            <PostHeader>
              <PostTitle variant="h1">{post.title}</PostTitle>
              <PostInfo>
                <Typography>작성자: {post.authorEmail.split('@')[0]}</Typography>
                <Typography>{new Date(post.createdAt).toLocaleString()}</Typography>
              </PostInfo>
            </PostHeader>
            <Divider />
            <PostContent>{post.content}</PostContent>
            {(userId === post.authorId) && (
              <ButtonGroup>
                <ActionButton onClick={handleEditStart}>
                  수정
                </ActionButton>
                <ActionButton 
                  variant="delete"
                  onClick={handleDeletePost}
                >
                  삭제
                </ActionButton>
              </ButtonGroup>
            )}
          </>
        ) : (
          <>
            <StyledTextField
              fullWidth
              label="제목"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              sx={{ mb: 2 }}
            />
            <StyledTextField
              fullWidth
              multiline
              rows={6}
              label="내용"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              sx={{ mb: 2 }}
            />
            <ButtonGroup>
              <ActionButton 
                onClick={handleEditSubmit}
                disabled={!editTitle.trim() || !editContent.trim()}
              >
                수정 완료
              </ActionButton>
              <ActionButton 
                variant="delete" 
                onClick={() => setIsEditing(false)}
              >
                취소
              </ActionButton>
            </ButtonGroup>
          </>
        )}
      </PostPaper>

      <CommentSection>
        <CommentTitle>
          댓글 ({comments.length})
        </CommentTitle>

        {comments.map((comment) => (
          <CommentCard key={comment.id} elevation={0}>
            <Typography variant="body1">
              {comment.content}
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 1
            }}>
              <Typography variant="body2" color="textSecondary">
                {comment.authorEmail.split('@')[0]} | 
                {new Date(comment.createdAt).toLocaleString()}
              </Typography>
              {userId === comment.authorId && (
                <ActionButton
                  size="small"
                  variant="delete"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  삭제
                </ActionButton>
              )}
            </Box>
          </CommentCard>
        ))}

        <Box sx={{ marginTop: 3 }}>
          <CommentInput
            fullWidth
            multiline
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 작성해주세요"
            variant="outlined"
          />
          <ButtonGroup>
            <ActionButton onClick={handleAddComment}>
              댓글 작성
            </ActionButton>
          </ButtonGroup>
        </Box>
      </CommentSection>
    </DetailContainer>
  );
}

export default OpinionDetail;