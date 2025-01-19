import { useState, useEffect } from "react";
import axios from '../api/axios';
import BoardList from "../components/BoardList.js";
import BoardWrite from "../components/BoardWrite.js"
import BoardView from "../components/BoardView.js"
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link, CircularProgress, Alert } from "@mui/material";
import Main from "./MainPage.js";

function Notify() {
  const navigate = useNavigate();
  const [isWrite, setIsWrite] = useState(false);
  
    
  const handleSubmit = () => {
    setIsWrite(true);
  };
  const handlePostSubmit = () => {
    setIsWrite(false);
  };
  return (
    <>
      <div>
       
        <Main>
        </Main>
        {isWrite ? (<BoardWrite name={"NOTICE"} onPostSubmit={handlePostSubmit}/>) : (<BoardList name={"NOTICE"} />)}
        {!isWrite && (<Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2, padding: 1.5 }}
                      >
                        글 작성
        </Button>)}
      </div>
    </>
  );
}

export default Notify