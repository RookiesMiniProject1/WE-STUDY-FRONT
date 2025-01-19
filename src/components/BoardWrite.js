import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from '../api/axios';
import { Container, Box, Grid2, Typography, Link, CircularProgress, Alert } from "@mui/material";


function BoardWrite({ onPostSubmit, name }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(localStorage.getItem("userEmail"));
  const [groupID, setGroupID] = useState(0);
  const [boardtype, setBoardtype] = useState(name);
  console.log(typeof(name));

 
  const handleClick = (e) => {
    e.preventDefault();
    if (title.trim() === '' || content.trim() === '') {
      alert('제목과 내용은 필수입니다.');
      return;
    }
    axios
    .post("/api/posts", {
      boardType: boardtype,
      title,
      content,
      author,
      groupID
    })
    .then((response)=>{
      console.log(response.data);
      onPostSubmit();
    })
    .catch((error)=>{
        console.log(error)
    });
  
  }

  return (
    <>
  
    <Container maxWidth="m">
      <Box sx={{ mt: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 item xs={12}>
            <Typography variant="h6" gutterBottom > 제목 </Typography>
            </Grid2>
            <Grid2 item xs={12}>
            <Typography variant="caption" gutterBottom > 작성자: {author.split("@")[0]} </Typography>
            </Grid2>
            <Grid2 item xs={12}>
            <TextField 
              fullWidth  
              variant="outlined" 
              label="제목"
              onChange={(e) => setTitle(e.target.value)} 
              required/>
            </Grid2>
            </Grid2>
            <Typography variant="h6" gutterBottom > 본문 </Typography>
              <TextField 
                fullWidth
                multiline
                rows={15}
                label="내용"
                variant="outlined"
                onChange = {(e) => setContent(e.target.value)}
                required/>
            <Box
                    display="flex"
                    alignItems="right"
                    justifyContent="right"
                    sx={{ mt: 2 }}
                  >
            <Button 
              variant="contained"
              type="submit"
              onClick={handleClick}
              sx={{ mt: 2 }}
              >
            저장
            </Button>
            </Box>
      </Box>
      <Box sx={{ mt: 8 }}>
      </Box>
    </Container>
    </>
  );
}

export default BoardWrite;
