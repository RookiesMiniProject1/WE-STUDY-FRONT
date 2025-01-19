import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "../api/axios";
import { Box, Typography } from "@mui/material";
import "../styles/Modal.css";

function KanbanBoardCreate({ modalHandler, updateHandler, groupId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const HandleClick = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(description);
    if (title.trim() === "" || description.trim() === "") {
      alert("제목과 내용은 필수입니다.");
      return;
    }
    axios
      .post(`/api/groups/${groupId}/board`, {
        title,
        description,
      })
      .then((response) => {
        console.log(response.data);
        updateHandler();
      })
      .catch((error) => {
        const errorMessage = error.response?.data?.message || error.message;
        alert(`ToDo 설정 중 문제가 생겼습니다: ${errorMessage}`);
        console.log(error);
      })
      .finally(() => {
        modalHandler();
      });
  };
  console.log(localStorage.getItem("userRole"));
  return (
    <>
      <div className="Overlay">
        <div className="container">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#9b59b6",
              }}
            >
              제목
            </Typography>
            <TextField
              required
              id="outlined-required"
              label="제목을 입력해주세요"
              size="small"
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                color: "#9b59b6",
              }}
            >
              {" "}
              일정설명{" "}
            </Typography>

            <TextField
              id="outlined-multiline-flexible"
              label="일정을 입력해주세요"
              multiline
              rows={8}
              required
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              margin: "0 auto",
              padding: 2,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={modalHandler}
              sx={{
                backgroundColor: "white",
                color: "#4a148c",
                borderColor: "#4a148c",
                "&:hover": {
                  backgroundColor: "#f3e5f5",
                  color: "#4a148c",
                  borderColor: "#4a148c",
                },
              }}
            >
              취소
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={HandleClick}
              sx={{
                backgroundColor: "#B19CD9",
                "&:hover": {
                  backgroundColor: "#9C7FBF",
                },
              }}
            >
              등록
            </Button>
          </Box>
        </div>
      </div>
    </>
  );
}

export default KanbanBoardCreate;
