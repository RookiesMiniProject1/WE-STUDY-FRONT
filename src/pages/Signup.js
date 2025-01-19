import React, { useState } from "react";
import { 
  Container, 
  Box, 
  Typography, 
  Button, 
  TextField, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Alert, 
  CircularProgress 
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { StyledPaper, FormSection, styles } from '../styles/SignupStyles';

const TECH_STACK_OPTIONS = [
  'JavaScript',
  'React',
  'HTML/CSS',
  'Java',
  'Spring',
  'Python',
  'Node.js',
  'C++',
  'MySQL',
  'MongoDB',
  'Redis',
  'AWS',
  'Docker',
  'Kubernetes',
  'Git',
  'Android',
  'iOS',
  'Flutter'
];

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTechStacks, setSelectedTechStacks] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    career: '',
    techStack: ''
  });

  const passwordsMatch = formData.password === formData.passwordConfirm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleTechStackToggle = (tech) => {
    setSelectedTechStacks(prev => {
      const newTechStacks = prev.includes(tech)
        ? prev.filter(item => item !== tech)
        : [...prev, tech];
      
      setFormData(prevForm => ({
        ...prevForm,
        techStack: newTechStacks.join(',')
      }));
      
      return newTechStacks;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !role) {
      setError('필수 항목을 모두 입력해주세요.');
      return;
    }

    if (role === 'mentor' && (!formData.career || !formData.techStack)) {
      setError('멘토는 경력과 기술 스택을 필수로 입력해야 합니다.');
      return;
    }

    if (role === 'mentor' && selectedTechStacks.length === 0) {
      setError('하나 이상의 기술 스택을 선택해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const signupData = {
        email: formData.email,
        password: formData.password,
        role: role.toUpperCase(),
        career: role === 'mentor' ? formData.career : null,
        techStack: role === 'mentor' ? formData.techStack : null
      };

      const response = await axios.post('/api/auth/register', signupData);
      
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
      
    } catch (error) {
      console.error('회원가입 에러:', error.response?.data);
      if (error.response) {
        switch (error.response.status) {
          case 400:
            setError(error.response.data || '입력 정보를 확인해주세요.');
            break;
          case 409:
            setError('이미 존재하는 이메일입니다.');
            break;
          default:
            setError('회원가입 중 오류가 발생했습니다.');
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
      <StyledPaper elevation={3}>
        <Typography variant="h4" sx={styles.title}>
          회원가입
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <RadioGroup 
          row 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          sx={styles.radioGroup}
        >
          <FormControlLabel value="mentor" control={<Radio />} label="멘토" />
          <FormControlLabel value="mentee" control={<Radio />} label="멘티" />
        </RadioGroup>

        {role && (
          <FormSection component="form" onSubmit={handleSubmit}>
            <TextField 
              fullWidth 
              name="email"
              label="이메일" 
              variant="outlined" 
              required
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              sx={styles.textField}
            />
            <TextField
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              variant="outlined"
              required
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              helperText="8자 이상의 영문, 숫자, 특수문자를 포함해주세요"
              sx={styles.textField}
            />
            <TextField
              fullWidth
              name="passwordConfirm"
              label="비밀번호 확인"
              type="password"
              variant="outlined"
              required
              value={formData.passwordConfirm}
              onChange={handleChange}
              disabled={isLoading}
              error={formData.passwordConfirm && !passwordsMatch}
              helperText={formData.passwordConfirm && !passwordsMatch ? "비밀번호가 일치하지 않습니다" : ""}
              sx={styles.textField}
            />
            {role === 'mentor' && (
              <>
                <TextField 
                  fullWidth 
                  name="career"
                  label="경력" 
                  variant="outlined"
                  required
                  value={formData.career}
                  onChange={handleChange}
                  disabled={isLoading}
                  sx={styles.textField}
                />
                <Box sx={styles.techStackContainer}>
                  <Typography variant="subtitle1" sx={styles.techStackTitle}>
                    기술 스택 선택
                  </Typography>
                  <Box sx={styles.techStackGrid}>
                    {TECH_STACK_OPTIONS.map((tech) => (
                      <Button
                        key={tech}
                        variant="outlined"
                        onClick={() => handleTechStackToggle(tech)}
                        sx={styles.techStackButton(selectedTechStacks.includes(tech))}
                        disabled={isLoading}
                      >
                        {tech}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={styles.button}
            >
              {isLoading ? <CircularProgress size={24} /> : "회원가입"}
            </Button>
          </FormSection>
        )}
      </StyledPaper>
    </Container>
  );
};

export default Signup;