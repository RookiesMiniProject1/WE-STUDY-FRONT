import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { Container, Box, TextField, Button, Typography, Link, CircularProgress, Alert } from "@mui/material";
import { StyledBox, styles } from '../styles/LoginStyles';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');   
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      const { token, email: userEmail, role, type } = response.data;
      
      localStorage.setItem('jwt', `${type} ${token}`);
      
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userRole', role);

      console.log('로그인 성공:', response.data);  
      
      navigate('/main');

    } catch (error) {
      console.error('로그인 에러:', error.response?.data);  
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('입력 정보를 확인해주세요.');
            break;
          case 401:
            setError('이메일 또는 비밀번호가 올바르지 않습니다.');
            break;
          case 404:
            setError('등록되지 않은 사용자입니다.');
            break;
          default:
            setError(error.response.data || '로그인 중 오류가 발생했습니다.');
        }
      } else {
        setError('서버와의 연결에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
    <Container sx={styles.container}>
      <StyledBox>
        <Typography variant="h4" sx={styles.title}>
          WESTUDY
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleLogin} noValidate style={{ width: '100%' }}>
          <TextField 
            fullWidth 
            label="이메일" 
            variant="outlined" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!error && error.includes('이메일')}
            disabled={isLoading}
            sx={styles.textField}
          />
          <TextField 
            fullWidth 
            label="비밀번호" 
            variant="outlined" 
            type="password" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!error && error.includes('비밀번호')}
            disabled={isLoading}
            sx={styles.textField}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isLoading}
            sx={styles.loginButton}
          >
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          {isLoading && (
            <div style={styles.loadingBox}>
              <CircularProgress />
            </div>
          )}

          <div style={{ textAlign: 'center' }}>
            <Link 
              component="button"
              onClick={() => navigate("/signup")}
              disabled={isLoading}
              sx={styles.signupLink}
            >
              회원가입
            </Link>
          </div>
        </form>
      </StyledBox>
    </Container>
  );
};

export default Login;