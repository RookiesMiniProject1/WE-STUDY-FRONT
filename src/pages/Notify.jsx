import axios from "../api/axios";
import BoardList from "../components/BoardList.js";
import BoardWrite from "../components/BoardWrite.js";
import BoardView from "../components/BoardView.js";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Menu,
  MenuItem,
  Box,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  InputAdornment,
  styled,
  Container,
  Pagination,
} from "@mui/material";

import {
  Header,
  SearchContainer,
  CreateButton,
  FilterButton,
  MatchButton,
  StudyGrid,
  Card,
  StudyInfo,
  StudyTitle,
  StyledDialog,
  DialogActionButton,
  RejectButton,
  PaginationStyled,
  ChipStyled,
} from "../styles/StudyGroupStyles";

function Opinion() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [postId, setPostId] = useState(0);
  const [profile, setProfile] = useState();
  const [userId, setUserId] = useState();

  const [isLeader, setIsLeader] = useState(false);
  const [isMentor, setIsMentor] = useState(false);

  //const [isWriter, setIsWriter] = useState(false);

  const [myGroups, setMyGroups] = useState();

  const [selectedPost, setSelectedPost] = useState();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openPost, setOpenPost] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState(0);

  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //랜더링 시 유저가 가입한 그룹정보, 유저 정보, 게시글 한번 불러오기
  useEffect(() => {
    Promise.all([
      axios.get("/api/groups/my-groups"),
      axios.get("/api/users/profile"),
      axios.get("/api/posts"),
    ])
      .then(([res1, res2, res3, res4]) => {
        setMyGroups(res1.data);
        setProfile(res2.data);
        setUserId(res2.data.data.userId);
        setPosts(res3.data.filter((post)=>post.boardType === "NOTICE"));
        if (res2.data.data.role === "MENTOR") {
          setIsMentor(true);
        }
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          navigate("/main");
        }
        const errorMessage = error.response?.data?.message || error.message;
        console.log(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //게시글에 변화 시 자동 업데이트
  useEffect(() => {
    let url = `/api/posts`;
    if (selectedGroupId) {
      url = `/api/posts/group/${selectedGroupId}`;
    }
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data.filter((post)=>post.boardType === "NOTICE"));
        setIsUpdate(false);
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          navigate("/main");
        }
        const errorMessage = error.response?.data?.message || error.message;
        alert(`게시글을 불러오는 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isUpdate]);

  //그룹변경될 때 마다 권한 재설정
  useEffect(() => {
    if (!profile) return;
    console.log("그룹변경");
    let url = `/api/posts`;
    if (selectedGroupId) {
      url = `/api/posts/group/${selectedGroupId}`;
    }
    axios
      .get(url)
      .then((response) => {
        setPosts(response.data.filter((post)=>post.boardType === "NOTICE"));
        setIsUpdate(false);
      })
      .catch((error) => {
        if (error.response?.status === 403) {
          navigate("/main");
        }
        const errorMessage = error.response?.data?.message || error.message;
        alert(`게시글을 불러오는 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(selectedGroupId);
    console.log(myGroups);
    console.log(profile);
    if (!selectedGroupId) {
      if (profile.data.role === "MENTOR") {
        setIsMentor(true);
        setIsLeader(false);
      } else {
        setIsMentor(false);
        setIsLeader(false);
      }
    } else {
      const currentGroup = myGroups.find(
        (group) => group.id === selectedGroupId
      );
      console.log(currentGroup);
      const role =
        currentGroup.members.find((member) => member.userId === userId)?.role ??
        null;
      if (role === "LEADER") {
        setIsLeader(true);
        setIsMentor(false);
      } else if (role === "MENTOR") {
        setIsMentor(true);
        setIsLeader(false);
      } else {
        setIsLeader(false);
        setIsMentor(false);
      }
    }
  }, [selectedGroupId]);
//페이징
  useEffect(() => {

    if(!posts){
      return;
    }
    const filteredPosts = posts.filter(
      (post) =>
        post.title.includes(searchQuery) || post.content.includes(searchQuery)
    );

    // 페이징 적용
    const startIndex = (currentPage - 1) * pageSize;
    const paginatedPosts = filteredPosts.slice(
      startIndex,
      startIndex + pageSize
    );

    setDisplayedPosts(paginatedPosts);
  }, [searchQuery, currentPage, posts, pageSize]);


  //로딩 대기
  if (isLoading)
    return (
      <Container>
        <Typography variant="h6" textAlign="center" color="#637381">
          정보를 불러오는 중...
        </Typography>
      </Container>
    );

  //ViewPage 핸들러
  const handlePostClick = (postId) => {
    getPost(postId);
  };

  const handlePostClose = () => {
    setOpenPost(false);
    setOpenEdit(false);
    setSelectedPost(null);
    setTitle("");
    setContent("");
    setNewTitle("");
    setNewContent("");
    setIsUpdate(true);
  };

  //postPage 핸들러
  const handleAddClick = () => {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
    setTitle("");
    setContent("");
  };

  //editPage 핸들러
  const handleEditClick = () => {
    setOpenEdit(true);
    setNewTitle(title);
    setNewContent(content);
  };
  const handleEditClose = () => {
    setNewTitle("");
    setNewContent("");
    setOpenEdit(false);
  };

  //내 그룹 선택
  const handleGroupChange = (value) => {
    setSelectedGroupId(value);
  };

  //게시글 관련 api
  const addPost = (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용은 필수입니다.");
      return;
    }
    let data = {
      title,
      content,
      boardType: "NOTICE",
    };
    if (selectedGroupId) {
      data.groupId = selectedGroupId;
    }
    axios
      .post("/api/posts", data)
      .then((response) => {
        handleAddClose();
        setTitle("");
        setContent("");
        setIsUpdate(true);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`글 등록 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      });
  };

  const getPost = (postId) => {
    axios
      .get(`/api/posts/${postId}`)
      .then((response) => {
        setSelectedPost(response.data);
        setTitle(response.data.title);
        setContent(response.data.content);
        setOpenPost(true);
        setPostId(postId);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`게시글 등록하는 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      });
  };
  const editPost = (postId) => {
    if (title.trim() === "" || content.trim() === "") {
      alert("제목과 내용은 필수입니다.");
      return;
    }
    axios
      .put(`/api/posts/${postId}`, {
        title: newTitle,
        content: newContent,
      })
      .then((response) => {
        console.log(response);
        //handlePostClose();
        getPost(postId);
        handleEditClose();
        setIsUpdate(true);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`게시글 수정하는 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      });
  };

  const deletePost = (postId) => {
    axios
      .delete(`/api/posts/${postId}`)
      .then(() => {
        handlePostClose();
        setIsUpdate(true);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`게시글 삭제하는 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      });
  };
  //console 확인

  //게시판 그룹 선택
  function selectGroup() {
    if (openPost || openAdd) return;
    return (
      <>
        <div>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="group-select-label">그룹 선택</InputLabel>
            <Select
              labelId="group-select-label" // 레이블 id 연결
              id="group-select" // Select의 고유 id
              value={selectedGroupId} // 선택된 그룹의 값을 상태로 관리
              onChange={(e) => handleGroupChange(e.target.value)} // 그룹 선택 변경 핸들러
              label="게시판 그룹 선택"
            >
              {/* myGroups 리스트 생성 기본값 전체 계시판 추가 */}
              <MenuItem value={0}>전제 게시판</MenuItem>
              {myGroups &&
                myGroups.map((group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.title} {/* 그룹 이름 */}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>게시판 그룹을 선택하세요</FormHelperText>
          </FormControl>
        </div>
      </>
    );
  }
  //게시물 추가 화면
  function postPage() {
    if (!openAdd) {
      return null;
    }
    return (
      <>
        {/*
         <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>게시글 작성</DialogTitle>
        <DialogContent>
        
        게시글 등록을 모달로 디자인 하신다면 주석을 풀고 box를 지워주세요!
        */}
        <Box sx={{ padding: 4 }}>
          <TextField
            label="제목"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="내용"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          {/*</DialogContent>
        <DialogActions>*/}
          <Button onClick={handleAddClose} color="primary">
            취소
          </Button>
          <Button onClick={(e) => addPost(e)} color="primary">
            저장
          </Button>
        </Box>
        {/*
        </DialogActions>
      </Dialog>*/}
      </>
    );
  }
  // 게시물 수정 화면
  function editPage() {
    if (!openEdit) {
      return null;
    }
    return (
      <>
        {/*
         <Dialog open={openAdd} onClose={handleAddClose}>
        <DialogTitle>게시글 수정</DialogTitle>
        <DialogContent>
        
        게시글 등록을 모달로 디자인 하신다면 주석을 풀고 box를 지워주세요!
        */}
        <Box sx={{ padding: 4 }}>
          <TextField
            label="제목"
            variant="outlined"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="내용"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          {/*</DialogContent>
        <DialogActions>*/}
          <Button onClick={handleEditClose} color="primary">
            취소
          </Button>
          <Button onClick={() => editPost(postId)} color="primary">
            저장
          </Button>
        </Box>
        {/*
        </DialogActions>
      </Dialog>*/}
      </>
    );
  }
  //게시물 보기 화면
  function viewPage() {
    if (!openPost && !selectedPost) {
      return null;
    }
    return (
      <>
        {/*<Dialog open={selectedPost !== null} onClose={handlePostClose}>
          <DialogTitle>{selectedPost.title}</DialogTitle>
          <DialogContent>
          
          게시글 상세 보기를 모달로 디자인 하신다면 주석 풀고 박스 지워주세요
          */}
        <Box sx={{ padding: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {selectedPost.title}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2 }}>
            {selectedPost.content}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            작성자: {selectedPost.authorEmail.split("@")[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            마지막 수정일: {selectedPost.updatedAt.split("T")[0]}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, marginTop: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleEditClick}
              disabled={!(isLeader || isMentor)}
            >
              본문 수정
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => deletePost(postId)}
              disabled={!(isLeader || isMentor)}
            >
              본문 삭제
            </Button>
          </Box>
        </Box>
        <Box sx={{ marginTop: 4 }}>
          {/*</DialogContent>
          <DialogActions>
          게시글 상세보기를 모달로 디자인 하신다면 주석을 풀고 박스를 지워주세요요
          */}
          <Button onClick={handlePostClose} color="primary">
            목록보기
          </Button>
        </Box>
        {/*</DialogActions>
        </Dialog>*/}
      </>
    );
  }
  //게시글 불러오기 화면
  function initPage() {
    return (
      <div>
       {/* 검색 필드 */}
              <TextField
                label="검색"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="제목이나 내용을 검색하세요"
                sx={{ margin: "20px 0", width: "300px" }}
              />
      
        <TableContainer
          component={Paper}
          sx={{
            margin: "20px auto",
            width: "90%",
            border: "1px solid #B19CD9",
            borderRadius: "10px",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.16)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              margin: "20px 0",
              color: "#6A1B9A",
              fontWeight: "bold",
            }}
          >
            {selectedGroupId === 0
              ? "전체"
              : myGroups.find((group) => group.id === selectedGroupId)?.title ||
                "에러 체크"}{" "}
            공지사항
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#4A148C" }}>
                  번호
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#4A148C" }}>
                  제목
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#4A148C" }}>
                  작성자
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#4A148C" }}>
                  작성일
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {posts && posts.length > 0 ? (
                posts
                  .filter((post) => {
                    if (selectedGroupId === 0) {
                      return post.groupId === null;
                    }

                    return post.groupId === selectedGroupId;
                  })
                  .map((post, index) => (
                    <TableRow key={post.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell
                        onClick={() => handlePostClick(post.id)} // 제목 클릭 시 상세 내용 보기
                        style={{
                          cursor: "pointer",
                          color: "#6A1B9A",
                          fontWeight: "bold",
                        }}
                      >
                        {post.title}{" "}
                        <span
                          style={{
                            fontSize: "0.9rem",
                            color: "red",
                            fontWeight: "bold",
                          }}
                        >
                          [{post.comments.length}]
                        </span>
                      </TableCell>
                      <TableCell>{post.authorEmail.split("@")[0]}</TableCell>
                      <TableCell>{post.createdAt.split("T")[0]}</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))
              ) : (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ padding: 2 }}
                >
                  게시글이 없습니다. 새로 작성해보세요
                </Typography>
              )}
            </TableBody>
          </Table>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 2,
              marginBottom: 2,
              marginRight: 10,
            }}
          >
            <Button
              onClick={handleAddClick}
              variant="contained"
              color="secondary"
              disabled={!(isLeader || isMentor)}
              sx={{
                backgroundColor: "#D1C4E9", // 연보라색 배경
                "&:hover": { backgroundColor: "#B39DDB" }, // 호버 시 어두운 연보라색
                color: "#6A1B9A", // 글자 색
                borderRadius: "8px",
                padding: "8px 16px",
                fontWeight: "bold",
              }}
            >
              등록
            </Button>
          </Box>
        </TableContainer>
        <PaginationStyled>
                <Pagination
                  count={Math.ceil(
                    posts.filter(
                      (post) =>
                        post.title.includes(searchQuery) ||
                        post.content.includes(searchQuery)
                    ).length / pageSize
                  )} // 필터링된 데이터 기준 총 페이지 수 계산
                  page={currentPage}
                  onChange={(event, value) => setCurrentPage(value)}
                  color="primary"
                  sx={{ margin: "20px 0", display: "flex", justifyContent: "center" }}/>
                  </PaginationStyled>
      </div>
    );
  }

  //메인 랜더링
  return (
    <>
      <div>{selectGroup()}</div>
      <div>
        {/*모달로 구현할 경우 코드드
          {viewPage()}
          {postPage()}
          {initPage()}
          {editPage()}
        */}

        {/* 모달 구현인 경우 여기부터*/}
        {(() => {
          if (openPost) {
            if (openEdit) {
              return editPage();
            } else {
              return viewPage();
            }
          } else if (openAdd) {
            return postPage();
          } else {
            return initPage();
          }
        })()}
        {/* 여기까지 삭제*/}
      </div>
    </>
  );
}

export default Opinion;
