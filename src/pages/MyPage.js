import React, { useState, useEffect } from "react";
import { Container, Box, Typography, Button, TextField, Alert, CircularProgress,Chip,Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios'; 
import { StyledPaper, FormSection, styles } from '../styles/MyPageStyles';

const MyPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    password: '',
    passwordConfirm: '',
    career: '',
    techStack: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/users/profile');
        const userData = response.data.data; 
        setFormData({
          email: userData.email,
          role: userData.role.toLowerCase(),
          password: '',
          passwordConfirm: '',
          career: userData.career || '',
          techStack: userData.techStack || ''
        });
      } catch (error) {
        console.error('사용자 정보 불러오기 에러:', error.response?.data);
        setError('사용자 정보를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const passwordsMatch = formData.password === formData.passwordConfirm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password && !passwordsMatch) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const updateData = {
        email: formData.email, 
        career: formData.role === 'mentor' ? formData.career : undefined,
        techStack: formData.role === 'mentor' ? formData.techStack : undefined
      };

      const response = await axios.put('/api/users/update-profile', updateData);
      
      console.log('정보 수정 성공:', response.data);
      alert('정보가 수정되었습니다.');
      navigate('/');
      
    } catch (error) {
      console.error('정보 수정 에러:', error.response?.data);
      setError('정보 수정 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);
    try {
      const changePasswordData = {
        oldPassword: formData.oldPassword,
        newPassword: formData.password
      };

      const response = await axios.put('/api/users/change-password', changePasswordData);
      
      console.log('비밀번호 변경 성공:', response.data);
      alert('비밀번호가 변경되었습니다.');
      navigate('/');
      
    } catch (error) {
      console.error('비밀번호 변경 에러:', error.response?.data);
      setError('비밀번호 변경 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={styles.container}>
      <StyledPaper elevation={3}>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormSection>
          <Typography variant="h6" sx={styles.subTitle}>
            기본 정보
          </Typography>
          <Chip 
            label={formData.role === 'mentor' ? '멘토' : '멘티'} 
            sx={styles.roleChip}
          />
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField 
              fullWidth 
              name="email"
              label="이메일" 
              variant="outlined" 
              margin="normal" 
              value={formData.email}
              disabled
              sx={styles.textField}
            />
            {formData.role === 'mentor' && (
              <>
                <TextField 
                  fullWidth 
                  name="career"
                  label="경력" 
                  variant="outlined" 
                  margin="normal"
                  value={formData.career}
                  onChange={handleChange}
                  disabled={isLoading}
                  sx={styles.textField}
                />
                <TextField 
                  fullWidth 
                  name="techStack"
                  label="주요 기술" 
                  variant="outlined" 
                  margin="normal"
                  value={formData.techStack}
                  onChange={handleChange}
                  disabled={isLoading}
                  sx={styles.textField}
                />
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "정보 수정"}
            </Button>
          </Box>
        </FormSection>

        <Divider sx={{ my: 4 }} />

        <FormSection>
          <Typography variant="h6" sx={styles.subTitle}>
            비밀번호 변경
          </Typography>
          <Box component="form" onSubmit={handleChangePassword}>
            <TextField
              fullWidth
              name="oldPassword"
              label="기존 비밀번호"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.oldPassword}
              onChange={handleChange}
              disabled={isLoading}
              sx={styles.textField}
            />
            <TextField
              fullWidth
              name="password"
              label="새 비밀번호"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              sx={styles.textField}
            />
            <TextField
              fullWidth
              name="passwordConfirm"
              label="새 비밀번호 확인"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.passwordConfirm}
              onChange={handleChange}
              disabled={isLoading}
              error={formData.passwordConfirm && !passwordsMatch}
              helperText={formData.passwordConfirm && !passwordsMatch ? "비밀번호가 일치하지 않습니다" : ""}
              sx={styles.textField}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.button}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "비밀번호 변경"}
            </Button>
          </Box>
        </FormSection>
      </StyledPaper>
    </Container>
  );
};

export default MyPage;