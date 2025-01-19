import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../api/axios';
import { Container, Box, Grid2, Typography, Link, CircularProgress, Alert } from "@mui/material";
import {  Tabs, Tab, List, ListItemText, Divider } from "@mui/material";
import ListItem from '@mui/material/ListItem';


function TodoContent(){
    const {groupId} = useParams();

    useEffect(() => {
        axios
        .get(`/api/groups/${groupId}/board`)
        .then((res)=>{
            console.log(res);
        })
        .catch((err) => {
            console.error('Error creating Kanban board:', err);
            alert(`ToDO 추가중 에러가 생겼습니다.: ${err.response?.data?.message || err.message}`);
        });

    },[]);
    return(
        <>
        </>
    )
}

export default TodoContent;