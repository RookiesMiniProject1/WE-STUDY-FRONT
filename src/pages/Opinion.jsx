import { useState, useEffect } from "react";
import axios from '../api/axios';
import BoardList from "../components/BoardList.js";
import BoardWrite from "../components/BoardWrite.js"
import BoardView from "../components/BoardView.js"
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Link, CircularProgress, Alert } from "@mui/material";
import Main from "./MainPage.js";

function Opinion() {
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
        {isWrite ? (<BoardWrite name={"DISCUSSION"} onPostSubmit={handlePostSubmit}/>) : (<BoardList name={"DISCUSSION"} />)}
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

export default Opinion;
