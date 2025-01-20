import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Typography, Box, MenuItem, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import {
  DetailContainer,
  AssignPaper,
  AssignHeader,
  AssignTitle,
  AssignInfo,
  AssignContent,
  ActionButton,
  SubmissionSection,
  SubmissionCard,
  ButtonGroup,
  BackButton,
  Divider,
  StyledTextField,
  FeedbackSection,
  FileUploadButton,
  StatusSelect,
} from "../styles/AssignStyles";

function AssignDetail({ groupId, assignId, onBack }) {
  const [assign, setAssign] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDeadline, setEditDeadline] = useState("");
  const [submissionContent, setSubmissionContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [feedbacks, setFeedbacks] = useState({}); // 변경: 각 제출물별 피드백
  const [scores, setScores] = useState({}); // 변경: 각 제출물별 점수

  useEffect(() => {
    fetchData();
  }, [groupId, assignId]);

  const fetchData = async () => {
    try {
      const [assignRes, submissionsRes, profileRes] = await Promise.all([
        axios.get(`/api/groups/${groupId}/tasks/${assignId}`),
        axios.get(`/api/groups/${groupId}/tasks/${assignId}/submissions`),
        axios.get("/api/users/profile"),
      ]);

      setAssign(assignRes.data);
      setSubmissions(submissionsRes.data);
      // 수정: profileRes.data.data에서 role 가져오기
      setUserRole(profileRes.data.data.role);

      // 디버깅을 위한 콘솔 로그
      console.log("Profile response:", profileRes.data);
      console.log("User role:", profileRes.data.data.role);
    } catch (error) {
      console.error("데이터 로딩 실패:", error);
      alert("과제 정보를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.");
        event.target.value = "";
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!submissionContent.trim()) {
        alert("과제 내용을 입력해주세요.");
        return;
      }

      const submissionData = {
        content: submissionContent,
      };

      if (selectedFile) {
        submissionData.filePath = selectedFile.path;
        submissionData.fileName = selectedFile.name;
      }

      const response = await axios.post(
        `/api/groups/${groupId}/tasks/${assignId}/submissions`,
        submissionData,
      );

      if (response.data) {
        alert("과제가 성공적으로 제출되었습니다.");
        setSubmissionContent("");
        setSelectedFile(null);
        fetchData();
      }
    } catch (error) {
      console.error("과제 제출 실패:", error);
      if (error.response && error.response.status === 403) {
        alert("권한이 없거나 마감기한이 지났습니다.");
      } else {
        alert("과제 제출에 실패했습니다.");
      }
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await axios.put(`/api/groups/${groupId}/tasks/${assignId}/status`, {
        status: newStatus,
      });
      fetchData();
    } catch (error) {
      console.error("상태 변경 실패:", error);
      alert("상태 변경에 실패했습니다.");
    }
  };

  // 변경: 멘토 피드백 처리 함수
  const handleMentorFeedback = async (submissionId) => {
    try {
      await axios.post(
        `/api/groups/${groupId}/tasks/${assignId}/submissions/${submissionId}/mentor-feedback`,
        {
          feedback: feedbacks[submissionId],
          score: parseInt(scores[submissionId]),
        },
      );
      // 해당 제출물의 피드백과 점수 초기화
      setFeedbacks((prev) => ({ ...prev, [submissionId]: "" }));
      setScores((prev) => ({ ...prev, [submissionId]: "" }));
      fetchData();
    } catch (error) {
      console.error("피드백 제출 실패:", error);
      alert("피드백 제출에 실패했습니다.");
    }
  };

  if (isLoading) {
    return (
      <DetailContainer>
        <Typography variant="h6" textAlign="center" color="#637381">
          정보를 불러오는 중...
        </Typography>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <BackButton startIcon={<ArrowBackIcon />} onClick={onBack}>
        목록으로
      </BackButton>

      <AssignPaper>
        <AssignHeader>
          <AssignTitle variant="h1">{assign.title}</AssignTitle>
          <AssignInfo>
            <Typography>
              마감일: {new Date(assign.deadline).toLocaleString()}
            </Typography>
            {userRole === "MENTOR" && (
              <StatusSelect
                select // select 속성 추가
                value={assign.status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <MenuItem value="TODO">할 일</MenuItem>
                <MenuItem value="IN_PROGRESS">진행중</MenuItem>
                <MenuItem value="COMPLETED">완료</MenuItem>
              </StatusSelect>
            )}
          </AssignInfo>
        </AssignHeader>
        <Divider />
        <AssignContent>{assign.description}</AssignContent>
      </AssignPaper>

      <SubmissionSection>
        <Typography variant="h6">과제 제출</Typography>
        <Box sx={{ mt: 2 }}>
          <StyledTextField
            fullWidth
            multiline
            rows={4}
            value={submissionContent}
            onChange={(e) => setSubmissionContent(e.target.value)}
            placeholder="과제 내용을 작성하세요"
          />
          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
            <FileUploadButton
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
            >
              파일 선택
              <input
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.zip,.rar"
              />
            </FileUploadButton>
            {selectedFile && (
              <Typography variant="body2">
                선택된 파일: {selectedFile.name} (
                {(selectedFile.size / 1024 / 1024).toFixed(2)}MB)
              </Typography>
            )}
          </Box>
          <ButtonGroup>
            <ActionButton
              onClick={handleSubmit}
              disabled={!submissionContent.trim()}
            >
              제출하기
            </ActionButton>
          </ButtonGroup>
        </Box>

        {submissions.map((submission) => (
          <SubmissionCard key={submission.id}>
            <Typography variant="subtitle1">
              제출자: {submission.userEmail.split("@")[0]}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {submission.content}
            </Typography>
            {submission.fileName && (
              <Button
                variant="text"
                href={submission.filePath}
                target="_blank"
                download={submission.fileName}
                startIcon={<CloudDownloadIcon />}
                sx={{ mt: 1 }}
              >
                {submission.fileName}
              </Button>
            )}

            {userRole === "MENTOR" && (
              <FeedbackSection>
                <StyledTextField
                  fullWidth
                  label="피드백"
                  multiline
                  rows={2}
                  value={feedbacks[submission.id] || ""}
                  onChange={(e) =>
                    setFeedbacks((prev) => ({
                      ...prev,
                      [submission.id]: e.target.value,
                    }))
                  }
                />
                <StyledTextField
                  label="점수"
                  type="number"
                  value={scores[submission.id] || ""}
                  onChange={(e) =>
                    setScores((prev) => ({
                      ...prev,
                      [submission.id]: e.target.value,
                    }))
                  }
                  inputProps={{ min: 0, max: 100 }}
                  sx={{ width: 100, mt: 1 }}
                />
                <ActionButton
                  onClick={() => handleMentorFeedback(submission.id)}
                  disabled={
                    !feedbacks[submission.id]?.trim() || !scores[submission.id]
                  }
                >
                  피드백 제출
                </ActionButton>
              </FeedbackSection>
            )}

            {submission.mentorFeedback && (
              <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
                <Typography variant="subtitle2" color="primary">
                  멘토 피드백
                </Typography>
                <Typography variant="body2">
                  {submission.mentorFeedback}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  점수: {submission.mentorScore}점
                </Typography>
              </Box>
            )}
          </SubmissionCard>
        ))}
      </SubmissionSection>
    </DetailContainer>
  );
}

export default AssignDetail;
