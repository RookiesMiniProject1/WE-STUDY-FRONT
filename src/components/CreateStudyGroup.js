import React, { useState } from 'react';
import axios from 'axios';
import { 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  TextField,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import {
  StyledDialog,
  textFieldStyles,
  titleStyles,
  cancelButtonStyles,
  createButtonStyles,
  dialogContentStyles
} from '../styles/CreateStudyGroupStyles';

const CreateStudyGroup = ({ open, onClose }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    maxMembers: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      maxMembers: ''
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.maxMembers) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.post('http://localhost:8080/api/groups', 
        // API 명세에 맞게 딱 3개 필드만 전송
        {
          title: formData.title,
          description: formData.description,
          maxMembers: parseInt(formData.maxMembers)
        },
        {
          headers: {
            'Authorization': token
          }
        }
      );

      // 성공 시 처리
      setShowAlert(true);
      resetForm();
      setTimeout(() => {
        setShowAlert(false);
        onClose(true); 
      }, 2000);

    } catch (error) {
      console.error('스터디 그룹 생성 실패:', error);
      setError(error.response?.data?.message || '스터디 그룹 생성에 실패했습니다.');
    }
  };

  const handleClose = () => {
    resetForm();
    onClose(false);
  };

  return (
    <>
      <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={titleStyles}>스터디 생성</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={dialogContentStyles}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <TextField
                label="스터디 제목"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                fullWidth
                inputProps={{ 
                  minLength: 2,
                  maxLength: 100 
                }}
                sx={textFieldStyles}
              />
              <TextField
                label="설명"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                required
                fullWidth
                inputProps={{ 
                  maxLength: 1000 
                }}
                sx={textFieldStyles}
              />
              <TextField
                label="최대 인원"
                name="maxMembers"
                value={formData.maxMembers}
                onChange={handleChange}
                type="number"
                required
                fullWidth
                inputProps={{ 
                  min: 2,
                  max: 20 
                }}
                sx={textFieldStyles}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleClose}
              sx={cancelButtonStyles}
            >
              취소
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              sx={createButtonStyles}
            >
              생성
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity="success" 
          sx={{ 
            width: '100%',
            backgroundColor: '#B19CD9',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          스터디 그룹이 생성되었습니다!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateStudyGroup;