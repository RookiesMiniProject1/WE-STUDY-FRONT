import TextField from "@mui/material/TextField";
import { IconButton, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Container, Box, Typography } from "@mui/material";
import KanbanBoardViewStyles from "../styles/KanbanBoardViewStyles";
import KanbanItemCreate from "./KanbanItemCreate";

function KanbanBoardView({
  viewHandler,
  groupId,
  boardId,
  userId,
  isMentor,
  isLeader,
  boardtitle,
}) {
  console.log(boardtitle);
  console.log(viewHandler);
  console.log(groupId);
  console.log(boardId);
  console.log(isMentor);
  console.log(isLeader);
  console.log(userId);

  const [boardItem, setBoardItem] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [assigneeId, setAssigneeid] = useState(userId);
  const [status, setStatus] = useState("TODO");
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const headtitle = boardtitle;

  useEffect(() => {
    console.log("hi");
    axios
      .get(`/api/groups/${groupId}/board/${boardId}/items`)
      .then((response) => {
        console.log(response.data);
        setBoardItem(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`ToDo 불러오는 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isUpdate]);

  if (isLoading)
    return (
      <Container>
        <Typography variant="h6" textAlign="center" color="#637381">
          정보를 불러오는 중...
        </Typography>
      </Container>
    );

  const modalHandler = () => {
    setIsOpen(!isOpen);
    console.log("modalHandler 실행");
  };
  const updateHandler = () => {
    setIsUpdate(!isUpdate);
  };

  const openHandler = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };
  const closeHandler = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  const handlePriorityChange = (event, value) => {
    setSelectedItem((prev) => ({
      ...prev,
      priority: value,
    }));
  };
  const handleStatusChange = (event, value) => {
    setSelectedItem((prev) => ({
      ...prev,
      status: value,
    }));
  };
  const handleTitleChange = (event, value) => {
    setSelectedItem((prev) => ({
      ...prev,
      title: value,
    }));
  };
  const handleDesctiprionChange = (event, value) => {
    setSelectedItem((prev) => ({
      ...prev,
      description: value,
    }));
  };
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  const postHandler = (e) => {
    setTitle(selectedItem.title);
    setDescription(selectedItem.description);
    setPriority(selectedItem.priority);
    setStatus(selectedItem.status);
    console.log(title);
    console.log(description);
    console.log(priority);
    console.log(status);
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("제목과 내용은 필수입니다.");
      return;
    }
    axios
      .put(`/api/groups/${groupId}/board/${boardId}/items/${selectedItem.id}`, {
        title,
        description,
        assigneeId,
        priority,
        status,
      })
      .then((response) => {
        console.log(response.data);
        closeHandler();
        updateHandler();
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

  const deleteHandler = () => {
    axios
      .delete(
        `/api/groups/${groupId}/board/${boardId}/items/${selectedItem.id}`
      )
      .then(() => {
        closeHandler();
        updateHandler();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`ToDo 삭제 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        closeHandler();
      });
  };

  console.log(selectedItem);

  const renderModal = () => {
    if (!isModalOpen || !selectedItem) return null;
    const editable = isLeader || isMentor || selectedItem.assigneeId === userId;
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
            variant="h5"
            sx={{ fontWeight: "bold", marginBottom: "16px" }}
          >
            {editable ? (
              <TextField
                fullWidth
                value={selectedItem.title || ""}
                variant="outlined"
                size="small"
                onChange={(e) => handleTitleChange(e, e.target.value)}
              />
            ) : (
              selectedItem.title || "제목 없음"
            )}
          </Typography>

          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            {editable ? (
              <TextField
                fullWidth
                value={selectedItem.description || ""}
                variant="outlined"
                size="small"
                multiline
                rows={4}
                onChange={(e) => handleDesctiprionChange(e, e.target.value)}
              />
            ) : (
              selectedItem.description || "설명이 없습니다."
            )}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>담당자 이메일:</strong>{" "}
            {selectedItem.assigneeEmail || "없음"}
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginBottom: "8px", fontWeight: "bold" }}
          >
            우선도
          </Typography>
          <select
            value={selectedItem.priority}
            onChange={(e) => handlePriorityChange(e, e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundColor: "#f5f5f5",
              marginBottom: "16px",
            }}
          >
            <option value={1}>1 - 높은 우선도</option>
            <option value={2}>2 - 보통 우선도</option>
            <option value={3}>3 - 낮은 우선도</option>
          </select>
          <Typography variant="body1" sx={{ marginBottom: "8px" }}>
            <strong>생성일:</strong>{" "}
            {new Date(selectedItem.createdAt).toLocaleString() || "없음"}
          </Typography>

          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              <strong>상태:</strong>
            </Typography>
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              {["TODO", "IN_PROGRESS", "DONE"].map((status) => (
                <Box
                  key={status}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    checked={selectedItem.status === status}
                    onChange={(e) => handleStatusChange(e, status)}
                    style={{ marginRight: "5px" }}
                  />
                  <Typography>{status}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={postHandler}
              disabled={!editable}
              sx={{
                backgroundColor: "#a985c1",
                "&:hover": { backgroundColor: "#9475b5" },
              }}
            >
              수정
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={deleteHandler}
              disabled={!editable}
              sx={{
                backgroundColor: "#ff6f61",
                "&:hover": { backgroundColor: "#e65a4f" },
              }}
            >
              삭제
            </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box sx={KanbanBoardViewStyles.container}>
        <Box sx={KanbanBoardViewStyles.header}>
          <Typography sx={KanbanBoardViewStyles.headerTitle}>
            {headtitle}
          </Typography>
          <Box sx={{ display: "flex", gap: "3rem", alignItems: "center" }}>
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={viewHandler}
              sx={KanbanBoardViewStyles.backButton}
            >
              돌아가기
            </Button>

            <Button
              variant="text"
              startIcon={<AddIcon />}
              onClick={modalHandler}
              sx={KanbanBoardViewStyles.addButton}
            >
              ToDo 추가
            </Button>
            {isOpen && (
              <KanbanItemCreate
                modalHandler={modalHandler}
                updateHandler={updateHandler}
                groupId={groupId}
                boardId={boardId}
                userId={userId}
              />
            )}
          </Box>
        </Box>
        <Box sx={KanbanBoardViewStyles.boardContainer}>
          <Box flexDirection="column" width="330px">
            <Box sx={KanbanBoardViewStyles.column}>
              <Typography sx={KanbanBoardViewStyles.columnTitle}>
                ToDo
              </Typography>
            </Box>
            <Box sx={KanbanBoardViewStyles.itemContainer}>
              {boardItem
                .filter((item) => item.status === "TODO")
                .map((item) => {
                  let priorityStyle;
                  switch (item.priority) {
                    case 1:
                      priorityStyle = KanbanBoardViewStyles.highPriority;
                      break;
                    case 2:
                      priorityStyle = KanbanBoardViewStyles.mediumPriority;
                      break;
                    case 3:
                      priorityStyle = KanbanBoardViewStyles.lowPriority;
                      break;
                    default:
                      priorityStyle = {};
                  }

                  return (
                    <Box
                      onClick={() => openHandler(item)}
                      key={item.id}
                      sx={{
                        ...KanbanBoardViewStyles.itemBox,
                        ...priorityStyle,
                      }}
                    >
                      <Typography sx={KanbanBoardViewStyles.itemTitle}>
                        {item.title}
                      </Typography>
                      <Typography sx={KanbanBoardViewStyles.itemDescription}>
                        {item.description}
                      </Typography>
                      <Typography sx={KanbanBoardViewStyles.priority}>
                        우선도: {item.priority}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
          <Box flexDirection="column" width="330px">
            <Box sx={KanbanBoardViewStyles.column}>
              <Typography sx={KanbanBoardViewStyles.columnTitle}>
                진행 중
              </Typography>
            </Box>
            <Box sx={KanbanBoardViewStyles.itemContainer}>
              {boardItem
                .filter((item) => item.status === "IN_PROGRESS")
                .map((item) => {
                  let priorityStyle;
                  switch (item.priority) {
                    case 1:
                      priorityStyle = KanbanBoardViewStyles.highPriority;
                      break;
                    case 2:
                      priorityStyle = KanbanBoardViewStyles.mediumPriority;
                      break;
                    case 3:
                      priorityStyle = KanbanBoardViewStyles.lowPriority;
                      break;
                    default:
                      priorityStyle = {};
                  }

                  return (
                    <Box
                      onClick={() => openHandler(item)}
                      key={item.id}
                      sx={{
                        ...KanbanBoardViewStyles.itemBox,
                        ...priorityStyle,
                      }}
                    >
                      <Typography sx={KanbanBoardViewStyles.itemTitle}>
                        {item.title}
                      </Typography>
                      <Typography sx={KanbanBoardViewStyles.itemDescription}>
                        {item.description}
                      </Typography>
                      <Typography sx={KanbanBoardViewStyles.priority}>
                        우선도: {item.priority}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
          <Box flexDirection="column" width="330px">
            <Box sx={KanbanBoardViewStyles.column}>
              <Typography sx={KanbanBoardViewStyles.columnTitle}>
                완료
              </Typography>
            </Box>
            <Box sx={KanbanBoardViewStyles.itemContainer}>
              {boardItem
                .filter((item) => item.status === "DONE")
                .map((item) => {
                  let priorityStyle;
                  switch (item.priority) {
                    case 1:
                      priorityStyle = KanbanBoardViewStyles.highPriority;
                      break;
                    case 2:
                      priorityStyle = KanbanBoardViewStyles.mediumPriority;
                      break;
                    case 3:
                      priorityStyle = KanbanBoardViewStyles.lowPriority;
                      break;
                    default:
                      priorityStyle = {};
                  }

                  return (
                    <Box
                      onClick={() => openHandler(item)}
                      key={item.id}
                      sx={{
                        ...KanbanBoardViewStyles.itemBox,
                        ...priorityStyle,
                      }}
                    >
                      <Typography sx={KanbanBoardViewStyles.itemTitle}>
                        {item.title}
                      </Typography>
                      <Typography sx={KanbanBoardViewStyles.itemDescription}>
                        {item.description}
                      </Typography>
                      <Typography sx={KanbanBoardViewStyles.priority}>
                        우선도: {item.priority}
                      </Typography>
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </Box>
      {renderModal()}
    </>
  );
}

export default KanbanBoardView;
