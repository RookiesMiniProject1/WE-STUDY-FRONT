import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  MenuItem,
  Box,
  InputAdornment,
  Table,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

import {
  MainContainer,
  StyledPaper,
  ActionButton,
  SearchBox,
  TableContainer,
  StyledFormControl,
  Header,
  PageTitle,
  StyledTextField,
  StatusChip,
} from "../styles/AssignStyles";
import AssignDetail from "./AssignDetail";

function Assign() {
  const [assigns, setAssigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [myGroups, setMyGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [view, setView] = useState("list");
  const [selectedAssignId, setSelectedAssignId] = useState(null);
  const [openWriteModal, setOpenWriteModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    fetchInitialData();
  }, [selectedGroupId]);

  const fetchInitialData = async () => {
    try {
      const groupsRes = await axios.get("/api/groups/my-groups");
      setMyGroups(groupsRes.data);

      if (selectedGroupId) {
        const assignsRes = await axios.get(
          `/api/groups/${selectedGroupId}/tasks`,
        );
        setAssigns(assignsRes.data);
      }
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignClick = (assignId) => {
    setSelectedAssignId(assignId);
    setView("detail");
  };

  const handleBackToList = () => {
    setView("list");
    setSelectedAssignId(null);
    fetchInitialData();
  };

  const handleAddClick = () => {
    if (!selectedGroupId) {
      alert("그룹을 먼저 선택해주세요.");
      return;
    }
    setOpenWriteModal(true);
  };

  const handleWriteSubmit = async () => {
    try {
      if (!title.trim() || !description.trim() || !deadline) {
        alert("모든 필드를 입력해주세요.");
        return;
      }

      const data = {
        title,
        description,
        deadline: new Date(deadline).toISOString(), // DateTime-Local 입력값을 ISO 문자열로 변환
      };

      await axios.post(`/api/groups/${selectedGroupId}/tasks`, data);
      setOpenWriteModal(false);
      setTitle("");
      setDescription("");
      setDeadline("");
      fetchInitialData();
    } catch (error) {
      console.error("과제 생성 실패:", error);
      alert("과제 생성에 실패했습니다.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "TODO":
        return "#ff9800";
      case "IN_PROGRESS":
        return "#2196f3";
      case "COMPLETED":
        return "#4caf50";
      default:
        return "#9e9e9e";
    }
  };

  const filteredAssigns = assigns.filter((assign) =>
    assign.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const paginatedAssigns = filteredAssigns.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <MainContainer>
        <LinearProgress />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {view === "list" ? (
        <>
          <PageTitle>과제 게시판</PageTitle>

          <Header>
            <SearchBox>
              <TextField
                placeholder="과제명으로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </SearchBox>

            <Box sx={{ display: "flex", gap: 2 }}>
              <StyledFormControl size="small">
                <Select
                  value={selectedGroupId}
                  onChange={(e) => setSelectedGroupId(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value={0}>그룹 선택</MenuItem>
                  {myGroups.map((group) => (
                    <MenuItem key={group.id} value={group.id}>
                      {group.title}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              <ActionButton
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
              >
                과제 생성
              </ActionButton>
            </Box>
          </Header>

          <StyledPaper>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width="10%">번호</TableCell>
                    <TableCell width="40%">과제명</TableCell>
                    <TableCell width="20%">제출현황</TableCell>
                    <TableCell width="15%">마감일</TableCell>
                    <TableCell width="15%">상태</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedAssigns.length > 0 ? (
                    paginatedAssigns.map((assign, index) => (
                      <TableRow
                        key={assign.id}
                        onClick={() => handleAssignClick(assign.id)}
                        sx={{ cursor: "pointer" }}
                      >
                        <TableCell>
                          {(page - 1) * ITEMS_PER_PAGE + index + 1}
                        </TableCell>
                        <TableCell>{assign.title}</TableCell>
                        <TableCell>
                          {assign.submissions.length} 명 제출
                        </TableCell>
                        <TableCell>
                          {new Date(assign.deadline).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <StatusChip
                            label={assign.status}
                            style={{
                              backgroundColor: getStatusColor(assign.status),
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography color="textSecondary">
                          등록된 과제가 없습니다.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </StyledPaper>
        </>
      ) : (
        <AssignDetail
          groupId={selectedGroupId}
          assignId={selectedAssignId}
          onBack={handleBackToList}
        />
      )}

      <Dialog
        open={openWriteModal}
        onClose={() => setOpenWriteModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>새 과제 생성</DialogTitle>
        <DialogContent>
          <StyledTextField
            autoFocus
            margin="dense"
            label="과제명"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <StyledTextField
            label="과제 설명"
            multiline
            rows={6}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <StyledTextField
            label="마감일시"
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <ActionButton onClick={() => setOpenWriteModal(false)}>
            취소
          </ActionButton>
          <ActionButton
            onClick={handleWriteSubmit}
            disabled={!title.trim() || !description.trim() || !deadline}
          >
            생성
          </ActionButton>
        </DialogActions>
      </Dialog>
    </MainContainer>
  );
}

export default Assign;
