//버튼 눌렀을 때 모달 만들어서 아이템 추가
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Tabs, Tab, List, ListItemText, Divider } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import KanbanCreateStyles from "../styles/KanbanCreateStyles";

function KanbanItemCreate({
  modalHandler,
  updateHandler,
  groupId,
  boardId,
  userId,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const assigneeId = userId;
  console.log(assigneeId);
  console.log(userId)

  const postHandler = (e) => {
    console.log(priority)
    console.log(title)
    console.log(description)
    e.preventDefault();
    if (title.trim() === "" || description.trim() === "") {
      alert("모든 내용을 채워주세요");
      return;
    }
    axios
      .post(`/api/groups/${groupId}/board/${boardId}/items`, {
        title,
        description,
        priority,
        assigneeId,
      })
      .then((response) => {
        console.log(response.data);
        updateHandler();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`아이템 생성 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        modalHandler();
      });
  };

  return (
    <>
        <Box sx={KanbanCreateStyles.modal}>
          <Typography
            id="modal-title"
            variant="h6"
            sx={KanbanCreateStyles.title}
          >
            New Task 추가
          </Typography>
          <TextField
            label="제목"
            variant="outlined"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="상세 내용"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={KanbanCreateStyles.formControl}>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="우선도"
              value={priority}
              required
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value={1}>1 - High</MenuItem>
              <MenuItem value={2}>2 - Medium</MenuItem>
              <MenuItem value={3}>3 - Low</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button
              onClick={modalHandler}
              variant="outlined"
              sx={KanbanCreateStyles.cancelButton}
            >
              Cancel
            </Button>
            <Button onClick={postHandler} sx={KanbanCreateStyles.button}>
              Save
            </Button>
          </Box>
        </Box>
    </>
  );
}

export default KanbanItemCreate;
