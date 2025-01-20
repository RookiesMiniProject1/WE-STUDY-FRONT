import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js'; 
import MainPage from './pages/MainPage.js';
import MyPage from './pages/MyPage.js';
import MentorMatchingPage from './pages/MentorMatchingPage.js';
import Assign from './pages/Assign.jsx';
import Notify from './pages/Notify.jsx';
import Opinion from './pages/Opinion.jsx';
import TeamChat from './pages/TeamChat.jsx';
import Todo from './pages/Todo.jsx';
import CreateStudyGroup from './components/CreateStudyGroup.js';
import StudyGroupPage from './pages/StudyGroupPage.js';
import StudyGroupDetail from './components/StudyGroupDetail.js';
import MyStudyGroups from './pages/MyStudyGroups';
import OpinionDetail from './pages/OpinionDetail.jsx';
import AssignDetail from './pages/AssignDetail.jsx';
import Calendar from './pages/Calendar.js';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/creategroup" element={<CreateStudyGroup />} />
        <Route path="/studygroup" element={<StudyGroupPage />} />
        <Route path="/groups/:id" element={<StudyGroupDetail />} />
        <Route path="/mentormathcing" element={<MentorMatchingPage />} />
        <Route path="/mygroups" element={<MyStudyGroups />} />
        <Route path="/assign" element={<Assign />} />]
        <Route path="/notify" element={<Notify />} />
        <Route path="/opinion" element={<Opinion />} />
        <Route path="/opinion/:postId" element={<OpinionDetail />} />
        <Route path="/opinion/:postId" element={<AssignDetail />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/teamchat" element={<TeamChat />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  );
};

export default App;
//