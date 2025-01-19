import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  InputAdornment,
  Box,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import axios from "../api/axios";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

import {
  Container,
  Header,
  SearchContainer,
  CreateButton,
} from "../styles/StudyGroupStyles";
import KanbanBoardCreate from "../components/KanbanBoardCreate";
import KanbanBoardView from "../components/KanbanBoardView";
import { kanbanBoardStyles } from "../styles/KanbanBoardStyles";
import DropdownStyles from "../styles/DropDownStyles";

function Todo() {
  const [boardtitle, setBoardTitle] = useState("");
  const [boarddescription, setboardDescription] = useState("");
  const [kanbanboard, setkanbanboard] = useState();
  const [isMentor, setIsMentor] = useState(false);
  const [isLeader, setIsLeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("jwt");
  const [myGroups, setMyGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const isAnchorOpen = Boolean(anchorEl);
  const [isBoard, setIsBoard] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [profile, setProfile] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTitle, setNewtitle] = useState("");
  const [newDescription, setNewDescriptoin] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    Promise.all([
      axios.get("/api/groups/my-groups"),
      axios.get("/api/users/profile"),
    ])
      .then(([res1, res2]) => {
        setMyGroups(res1.data);
        if (res1.data.length > 0) {
          setCurrentGroup(res1.data[0]);
        }
        setProfile(res2.data);
        if (
          res1.data[0].members
            .filter(
              (member) => member.email === localStorage.getItem("userEmail")
            )
            .some((member) => member.role === "LEADER")
        ) {
          setIsLeader(true);
        }
        if (
          res1.data[0].members
            .filter(
              (member) => member.email === localStorage.getItem("userEmail")
            )
            .some((member) => member.role === "MENTOR")
        ) {
          setIsMentor(true);
        }
      })

      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`ToDo 불러오기 중 오류가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsView(false);
    if (!currentGroup) return;
    setIsLoading(true);
    axios
      .get(`/api/groups/${currentGroup.id}/board`)
      .then((res) => {
        setkanbanboard(res.data);
        setBoardTitle(res.data.title);
        setboardDescription(res.data.description);
        setIsUpdate(false);
        if (res.data) {
          setIsBoard(true);
        }
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        console.log(error);
        if (error.response.status === 404) {
          setkanbanboard([]);
          setIsBoard(false);
        } else {
          alert(`칸반보드 불러오기 실패: ${errorMessage}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentGroup, isUpdate]);

  if (isLoading)
    return (
      <Container>
        <Typography variant="h6" textAlign="center" color="#637381">
          정보를 불러오는 중...
        </Typography>
      </Container>
    );
  const deleteHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    axios
      .delete(`/api/groups/${currentGroup.id}/board/${kanbanboard.id}`)
      .then((response) => {
        console.log(response);
        setIsUpdate(true);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`일정 삭제 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {});
  };

  const postHandler = (e) => {
    setTitle(newTitle);
    setDescription(newDescription);
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("제목과 내용은 필수입니다.");
      return;
    }
    axios
      .put(`/api/groups/${currentGroup.id}/board/${kanbanboard.id}`, {
        title,
        description,
      })
      .then((response) => {
        console.log(response.data);
        closeHandler();
        setIsUpdate(true);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`ToDo 수정 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        closeHandler();
      });
  };

  const openHandler = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const closeHandler = () => {
    setNewDescriptoin(null);
    setNewtitle(null);
    setIsModalOpen(false);
  };
  const handleTitleChange = (event, value) => {
    setNewtitle(value);
  };
  const handleDesctiprionChange = (event, value) => {
    setNewDescriptoin(value);
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const renderModal = () => {
    if (!isModalOpen) return null;
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9998,
        }}
        onClick={closeHandler}
      >
        <Box
          onClick={handleModalClick}
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "400px",
            backgroundColor: "rgba(252, 246, 255, 0.95)",
            borderRadius: "16px",
            padding: "20px",
            boxShadow: "0 4px 10px rgba(255, 200, 253, 0.2)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <IconButton
            onClick={closeHandler}
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10000,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              padding: 3,
              fontWeight: "bold",
            }}
          >
            제목
          </Typography>
          <TextField
            fullWidth
            label="변경할 제목을 입력해주세요"
            variant="outlined"
            size="small"
            onChange={(e) => handleTitleChange(e, e.target.value)}
          />

          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              padding: 3,
              fontWeight: "bold",
            }}
          >
            내용
          </Typography>
          <TextField
            fullWidth
            label="변경할 내용을 작성해주세요"
            variant="outlined"
            size="small"
            multiline
            rows={4}
            onChange={(e) => handleDesctiprionChange(e, e.target.value)}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={postHandler}
              sx={{
                backgroundColor: "#a985c1",
                "&:hover": { backgroundColor: "#9475b5" },
              }}
            >
              수정
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };
  function KanbanCard({ boardtitle, boarddescription, onClick }) {
    return (
      <Box onClick={onClick} sx={kanbanBoardStyles.container}>
        <Typography variant="h6" sx={kanbanBoardStyles.title}>
          {boardtitle}
        </Typography>
        <Typography variant="body1" sx={kanbanBoardStyles.description}>
          {boarddescription}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            gap: "10px",
          }}
        >
          <Button
            onClick={(e) => openHandler(e)}
            variant="contained"
            sx={{
              ...kanbanBoardStyles.button,
              backgroundColor: "#00A136",
              "&:hover": {
                backgroundColor: "#00A136",
              },
              marginLeft: "8px",
            }}
            disabled={!(isLeader || isMentor)}
          >
            수정
          </Button>
          <Button
            variant="contained"
            sx={kanbanBoardStyles.button}
            disabled={!(isLeader || isMentor)}
            onClick={(e) => deleteHandler(e)}
          >
            삭제
          </Button>
        </Box>
      </Box>
    );
  }

  console.log(isLeader);
  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) {
      setCurrentGroup(option);
    }
  };
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleView = () => {
    setIsView(!isView);
  };
  const updateHandler = () => {
    setIsUpdate(!isUpdate);
  };

  console.log(boardtitle);
  return (
    <>
      <Container>
        {!isView ? (
          <>
            <Header>
              <SearchContainer>
                <TextField
                  fullWidth
                  placeholder="일정 검색"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#B19CD9" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </SearchContainer>
              <div style={{ display: "flex", gap: "1rem" }}>
                <CreateButton
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIsOpen(true)}
                  disabled={!(isLeader || isMentor)}
                >
                  {!(isLeader || isMentor)
                    ? "일정 추가는 멘토/리더에게 요청하세요"
                    : "새로운 일정 만들기"}
                </CreateButton>
                {isOpen && (
                  <KanbanBoardCreate
                    modalHandler={modalHandler}
                    updateHandler={updateHandler}
                    groupId={currentGroup.id}
                  />
                )}
                <Button
                  onClick={handleClick}
                  variant="contained"
                  sx={{
                    backgroundColor: "#d1c4e9",
                    color: "#4a148c",
                    "&:hover": { backgroundColor: "#b39ddb" },
                    borderRadius: "8px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    width: "200px",
                    textTransform: "none",
                  }}
                >
                  {currentGroup.title || "Select an option"}
                </Button>

                <Menu
                  anchorEl={anchorEl}
                  open={isAnchorOpen}
                  onClose={() => handleClose(null)}
                  sx={{
                    "& .MuiPaper-root": {
                      backgroundColor: "#ede7f6",
                      borderRadius: "8px",
                    },
                  }}
                >
                  {myGroups.map((group) => (
                    <MenuItem
                      key={group.id}
                      onClick={() => handleClose(group)}
                      sx={{
                        color: "#4a148c",
                        "&:hover": { backgroundColor: "#d1c4e9" },
                      }}
                    >
                      {group.title}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Header>
            <Box>
              {isBoard ? (
                <KanbanCard
                  boardtitle={boardtitle}
                  boarddescription={boarddescription}
                  onClick={handleView}
                />
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    color: "#6A5ACD",
                    padding: 3,
                    fontWeight: "bold",
                    backgroundColor: "#F3E5F5",
                    borderRadius: "10px",
                  }}
                >
                  멘토 혹은 리더에게 일정 추가를 요청해주세요.
                </Typography>
              )}
            </Box>
          </>
        ) : (
          <>
            <KanbanBoardView
              viewHandler={handleView}
              groupId={currentGroup.id}
              boardId={kanbanboard.id}
              userId={profile.data.userId}
              isMentor={isMentor}
              isLeader={isLeader}
              boardtitle={kanbanboard.title}
            />
          </>
        )}
      </Container>
      {renderModal()}
    </>
  );
}

export default Todo;
