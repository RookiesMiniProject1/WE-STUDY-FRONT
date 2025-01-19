import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../api/axios';
import { Container, Box, Grid2, Typography, Link, CircularProgress, Alert } from "@mui/material";
import {  Tabs, Tab, List, ListItemText, Divider } from "@mui/material";
import ListItem from '@mui/material/ListItem';

function BoardEdit() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState(localStorage.getItem("userEmail"));
  const [groupID, setGroupID] = useState(0);
  const [boardtype, setBoardtype] = useState("");
  const [selectedTab,setSelectedTab] = useState(0);
  const { id } = useParams();
  const [board, setBoard] = useState({});
  const navigate = useNavigate();
  const [writer, setWriter] = useState("");
  const tabs = [
    { label: "그룹 매칭" ,path: "/matching"},
    { label: "스터디 그룹" ,path: "/teamchat"},
    { label: "TO DO" ,path:"/todo"},
    { label: "마이 페이지" ,path:"/mypage"},
  ];

  const handleLogout = () => {
    navigate("/");
  };

    useEffect(() => {
      axios.get(`/api/posts/${id}`)
      .then((res) => {
        setBoard(res.data)
        console.log(res.data)
        setWriter(res.data.author.split("@")[0])
        setBoardtype(res.data.boardType)
      }).catch((err) => 
        console.log("에러",err)
    );
    }, []);
    console.log(board);
    console.log(boardtype);
    const handleClick=(e)=> {
      e.preventDefault();
      if (title.trim() === '' || content.trim() === '') {
        alert('제목과 내용은 필수입니다.');
        return;
      }
      axios
      .put(`/api/posts/edit/${id}`, {
        boardType: boardtype,
        title,
        content,
        author,
        groupID
      })
      .then((response)=>{
        console.log(response.data);
        navigate("/main")
      })
      .catch((error)=>{
          console.log(error)
      })
    }
    const handleTabChange = (event, newValue) => {
      const path = tabs[newValue].path;
      setSelectedTab(newValue);
      const cordinate = [newValue,0];
      navigate(path, {state:{cordinate}}) 
    };
    const style = {
      py: 0,
      width: '100%',
      maxWidth: 360,
      borderRadius: 2,
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.paper',
    };
    return (
      <Container maxWidth="m">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
            WESTUDY
          </Typography>
          <Button variant="text" color="primary" onClick={handleLogout} sx={{ position: "fixed", top: 30, right: 40, fontSize: '0.875rem' }}> 
            로그아웃 
          </Button>
        </Box>
  
        <Tabs onChange={handleTabChange} centered>
          {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label}/>
          ))}
        </Tabs>
        <Box  display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 8 }}>
        <List sx={style}>
              <ListItem>
                <ListItemText primary={board.title} />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText primary= {writer} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <ListItemText primary={board.content} />
              </ListItem>
            </List>
            </Box>
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
              label={board.title}
              onChange={(e) => setTitle(e.target.value)} 
              required/>
            </Grid2>
            </Grid2>
            <Typography variant="h6" gutterBottom > 본문 </Typography>
              <TextField 
                fullWidth
                multiline
                rows={15}
                label={board.content}
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

    );
  }
  export default BoardEdit