import TextareaAutosize from 'react-textarea-autosize';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../api/axios';
import { Container, Typography, Tabs, Tab, List, ListItemText, Divider,Grid2 } from "@mui/material";
import ListItem from '@mui/material/ListItem';
function BoardView() {
    const { id } = useParams();
    const [board, setBoard] = useState({});
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState(0);
    const [writer, setWriter] = useState("");
    useEffect(() => {
      axios
        .get(`/api/posts/${id}`)
        .then((res) => {
          setBoard(res.data)
          console.log(res.data)
          setWriter(res.data.author.split("@")[0])
        })
        .catch((err) => 
            console.log("에러",err)
        );
    }, []);
    
    const tabs = [
      { label: "그룹 매칭" ,path: "/matching"},
      { label: "스터디 그룹" ,path: "/teamchat"},
      { label: "TO DO" ,path:"/todo"},
      { label: "마이 페이지" ,path:"/mypage"},
    ];
  
    const handleLogout = () => {
      navigate("/");
    };
    /*if (board.author === localStorage.getItem("userEmail")){
      setIsMe(true)
    }*/
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
    console.log(board.title,
   board.content,
     board.author,
      board.groupID,
      typeof(board.boardType))
    function handleRemove() {
         
        axios
          .delete(`/api/posts/${id}`)
          .then(() => navigate("/main")
          )
          .catch((err) => console.log(err)
          );
      }
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
            {board.author === localStorage.getItem("userEmail") && (
              <Grid2 container spacing={2}>
                 <Grid2 item xs={12}>
              <Button
                        onClick={() => navigate(`/posts/edit/${board.id}`)}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, padding: 1.5 }}
                      >
                        글 수정
                      </Button>
                      </Grid2>
                      <Grid2 item xs={12}>
                      <Button
                      onClick={handleRemove}
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2, padding: 1.5 }}
          >
                      글 삭제
              </Button>
              </Grid2>
              </Grid2>
            )}
            </Box>
      </Container>

              
        
      
    
    );
  }


  export default BoardView;