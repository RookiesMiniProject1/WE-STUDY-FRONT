import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from '../api/axios';
import { useState, useEffect} from "react";
import { useNavigate, useSearchParams,useParams } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Link, CircularProgress, Alert } from "@mui/material";


function BoardList(props) {
  //const [posts, setPosts] = useState([]);
  //const [title, setTitle] = useState("");
  //const [content, setContent] = useState("");
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  //const [SearchParams] = useSearchParams();

  useEffect(( )=>{
    axios
    .get(`/api/posts`)
    .then((res)=>{
      setBoardList(res.data)})
    .catch((error)=>{
      console.error("게시글 불러오기 실패",error);
    });
  },[]);
  /* 페이징 기능 / 연결 후 추가
  useEffect(() => {
    axios.get(`/api/board/list?${searchParams}`).then((res) => {
      console.log(res.data)
      setBoardList(res.data.boardList);
      setPageInfo(res.data.pageInfo);
    });
  }, [searchParams]);
*/
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">제목</TableCell>
              <TableCell align="right">작성자</TableCell>
              <TableCell align="right">작성시간</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boardList
            .filter((board) => board.boardType === props.name)
            .map((board) => (
              <TableRow
                cursor={"pointer"}
                _hover={{ bgColor: "gray.200" }}
                onClick={() => navigate(`/posts/${board.id}`)}
                key={board.id}
              >
                <TableCell component="th" allign = "right">
                  <Link to = {`posts/${props.name}/${board.id}`}/>
                  {board.title}
                </TableCell>
                <TableCell align="right">{board.author.split("@")[0]}</TableCell>
                <TableCell align="right">{board.editTime.split("T")[0]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default BoardList;
