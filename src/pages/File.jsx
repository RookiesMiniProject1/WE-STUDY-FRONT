import { useState, useEffect } from "react";
import axios from '../api/axios';
import BoardList from "../components/BoardList.js";
import BoardWrite from "../components/BoardWrite.js"
import BoardView from "../components/BoardView.js"
import { useNavigate } from 'react-router-dom';
import { Container, Box, Input, Button, Typography, Link, CircularProgress, Alert } from "@mui/material";
import Main from "./MainPage.js";
import { grey } from "@mui/material/colors";

function File() {
    const [files, setFiles] = useState(null);

    const handleChangeFile = (event) => {
        setFiles(event.target.files);
    };
    
    const handleButtonClick = () => {
        document.getElementById('fileInput').click();
    };

    const handleClearFiles = () => {
        setFiles(null);
    };

    const uploadFile = () => {
    
        if(files){
            const body = new FormData();
           
            for(let i=0 ; i< files.length ; i++) {
                body.append("file", files[i]);
            }
    
            axios.post("/file/upload", body)
                .then(response => {
                    if(response.data) {
                        setFiles(null);
                        alert("업로드 완료!");
                    }
                })
                .catch((error) => {
                    alert("실패!");
                })
        } 
      
        else{
            alert("파일을 1개 이상 넣어주세요!")
        }
    }


    return (
        <><Main></Main>
        <Container maxWidth="m">
            <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    bgcolor={grey}
                    sx={{ mt: 8 }}
                  >
            <Link to={`/readfile`} className="link">
                <Typography variant="h4" gutterBottom > 업로드한 파일 보기 </Typography>
            </Link>
            <Input
                type="file"
                id="fileInput"
                onChange={handleChangeFile}
                multiple
                style={{ display: 'none' }}
            ></Input>
            <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick = {handleButtonClick}
                        sx={{ mt: 2, padding: 1.5 }}
                      >
            파일 선택</Button>
          
            {files && (files.length >= 1 ) ? (
                <div className="file-list">
                <ul>
                    {Array.from(files).map((file, index) => (
                    <li key={index}>{file.name}</li>
                    ))}
                </ul>
                <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick = {handleClearFiles}
                        sx={{ mt: 2, padding: 1.5 }}
                      >
                    선택 파일 지우기</Button>
                </div>
            ) : (
                <p>선택된 파일 없음</p>
            )}
           <Button
                        type="upload-button"
                        variant="contained"
                        color="primary"
                        onClick = {uploadFile}
                        sx={{ mt: 2, padding: 1.5 }}
                      >
                    파일 업로드</Button>
                    </Box>
        </Container>
        </>
    );
}

export default File;