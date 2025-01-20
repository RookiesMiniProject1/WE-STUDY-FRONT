import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Toolbar, Tabs, Tab } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  theme, 
  StyledAppBar, 
  SubNavigationBar, 
  SubMenuItem,
  styles,
  Footer,
  FooterLogo,
  Copyright
} from '../styles/MainPageStyles';
import MainContent from '../components/MainContent';
import StudyGroupPage from './StudyGroupPage';
import CreateStudyGroup from '../components/CreateStudyGroup';
import MentorMatchingPage from './MentorMatchingPage';
import TeamChat from './TeamChat';
import Notify from './Notify';
import MyPage from './MyPage';
import Todo from './Todo';
import Opinion from './Opinion';

const MainPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [currentContent, setCurrentContent] = useState('main');
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/');
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderSubMenu = () => {
    switch (selectedMenu) {
      case 'study':
        return (
          <SubNavigationBar
            component={motion.div}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
              <SubMenuItem onClick={() => setCurrentContent('teamchat')}>
                팀채팅
              </SubMenuItem>
              <SubMenuItem onClick={() => setCurrentContent('notify')}>
                공지 게시판
              </SubMenuItem>
              <SubMenuItem onClick={() => setCurrentContent('opinion')}>의견 공유 게시판</SubMenuItem>
              <SubMenuItem onClick={() => {setCurrentContent('todo');}}>
                칸반보드</SubMenuItem>
            </Container>
          </SubNavigationBar>
        );
        default: 
          return null;
    }
  };

  const renderContent = () => {
    switch (currentContent) {
      case 'studygroup':
        return <StudyGroupPage />;
      case 'creategroup':
        return <CreateStudyGroup />;
      case 'notify':
        return <Notify />;
      case 'mentormatching':
        return <MentorMatchingPage />;
      case 'teamchat':          
        return <TeamChat />;
      case 'todo':          
        return <Todo />;
      case 'mypage':
        return <MyPage />;
      case 'opinion':
        return <Opinion />;
      case 'main':
      default:
        return <MainContent />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ ...styles.mainBox, paddingTop: selectedMenu ? '100px' : '60px' }}>
        <StyledAppBar position="fixed">
          <Toolbar sx={{ minHeight: '60px !important' }}>
            <Typography 
              variant="h4" 
              sx={styles.logo} 
              onClick={() => {
                setCurrentContent('main');
                setSelectedMenu(null);
                setValue(0); 
              }}
            >
              WESTUDY
            </Typography>

            <Tabs 
              value={value} 
              onChange={handleChange}
              sx={styles.tabs}
            >
              <Tab 
                label="멘토 매칭"
                onClick={() => {
                  setSelectedMenu(null);
                  setCurrentContent('mentormatching');
                }}
              />
              <Tab 
                label="스터디 매칭"
                onClick={() => {
                  setSelectedMenu(null);
                  setCurrentContent('studygroup');
                }}
              />
              <Tab 
                label="마이스터디"
                onClick={() => setSelectedMenu('study')}
              />
            </Tabs>

            <Box sx={{ flexGrow: 1 }} />
            
            <Typography 
              sx={styles.navLink}
              onClick={() => {
                setSelectedMenu(null);
                setCurrentContent('mypage');
              }}
            >
              내 정보
            </Typography>
            <Typography 
              sx={styles.navLink}
              onClick={handleLogout}
            >
              로그아웃
            </Typography>
          </Toolbar>
        </StyledAppBar>

        {renderSubMenu()}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </Box>
        <Footer>
        <Copyright>
          COPYRIGHT © SKROOKIES & WESTUDY. ALL RIGHTS RESERVED.
        </Copyright>
        <FooterLogo>
          WESTUDY
        </FooterLogo>
      </Footer>
      </Box>
    </ThemeProvider>
  );
};

export default MainPage;