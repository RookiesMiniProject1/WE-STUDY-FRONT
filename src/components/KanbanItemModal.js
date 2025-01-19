import React, { useState } from "react";
import KanbanItemStyles from "../styles/KanbanItemStyles";
import { Box, Button, Typography, Backdrop } from "@mui/material";

const KanbanItemModal = ({ open = false, closeHandler = ()=>{}, updateHandler = ()=>{}, item = null }) => {

  if(!open){
    console.warn("모달이 열리지 않은 상태에서 KanbanItemModal 렌더링");
    return null; 
  }
  const classes = KanbanItemModal();
  console.log(open);
  console.log(closeHandler);
  console.log(updateHandler);
  console.log(item);

  return (
    <>
    <Backdrop open={open} className={classes.overlay}>
      <Box className={classes.modalBox}>
        <Typography variant="h6" gutterBottom>
          연보라색 모달
        </Typography>
        <Typography variant="body1" paragraph>
          여기에 내용을 작성할 수 있습니다. 원하는 내용을 입력하세요!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%" }}
        >
          닫기
        </Button>
      </Box>
    </Backdrop>
   </>
    
  );
};

export default KanbanItemModal;
