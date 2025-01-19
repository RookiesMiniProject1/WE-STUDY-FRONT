import { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import axios from '../api/axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Container,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Send as SendIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Group as GroupIcon,
} from '@mui/icons-material';
import {
  ChatWrapper,
  ChatContainer,
  ChatRoomsList,
  MessageArea,
  MessagesContainer,
  MessageInputContainer,
  Message,
  MessageBubble,
} from '../styles/TeamChatStyles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#B19CD9',
      light: '#F2ECFF',
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

function TeamChat() {
  const [studyGroups, setStudyGroups] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newRoomName, setNewRoomName] = useState('');
  const [openNewRoomDialog, setOpenNewRoomDialog] = useState(false);
  const [openGroupSelectDialog, setOpenGroupSelectDialog] = useState(true);
  const [loading, setLoading] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    roomId: null,
  });
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);
  const currentSubscription = useRef(null);

  useEffect(() => {
    fetchStudyGroups();
  }, []);
  
  const fetchStudyGroups = async () => {
    try {
      const response = await axios.get('/api/groups/my-groups');
      setStudyGroups(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: '스터디 그룹 목록을 불러오는데 실패했습니다.',
        severity: 'error',
      });
    }
  };
  
  // WebSocket 연결 및 구독
  useEffect(() => {
    if (!selectedGroupId) return;
  
    stompClient.current = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws/chat'),
      connectHeaders: {
        Authorization: localStorage.getItem('jwt'),
      },
      onConnect: () => {
        console.log('WebSocket Connected');
        setWsConnected(true);
        setSnackbar({
          open: true,
          message: '채팅 서버에 연결되었습니다.',
          severity: 'success',
        });
  
        // 현재 방 구독
        if (currentRoom) {
          subscribeToRoom(currentRoom.id);
        }
  
        // 새로운 방 생성 이벤트 구독
        stompClient.current.subscribe('/topic/new-room', (message) => {
          try {
            const newRoom = JSON.parse(message.body);
            setRooms((prevRooms) => [...prevRooms, newRoom]);
          } catch (error) {
            console.error('새 채팅방 처리 오류:', error);
          }
        });
      },
      onDisconnect: () => {
        console.log('WebSocket Disconnected');
        setWsConnected(false);
        setSnackbar({
          open: true,
          message: '채팅 서버와 연결이 끊어졌습니다.',
          severity: 'error',
        });
      },
      onStompError: (frame) => {
        console.error('STOMP error:', frame);
        setSnackbar({
          open: true,
          message: '채팅 서버 오류가 발생했습니다.',
          severity: 'error',
        });
      },
    });
  
    stompClient.current.activate();
  
    return () => {
      if (stompClient.current) {
        if (currentSubscription.current) {
          currentSubscription.current.unsubscribe();
        }
        stompClient.current.deactivate();
      }
    };
  }, [selectedGroupId, currentRoom]);
  
  // 채팅방 목록 가져오기
  useEffect(() => {
    if (selectedGroupId) {
      fetchRooms(); // 중복 선언 제거, 재사용
    }
  }, [selectedGroupId]);
  
  // 중복제거거거
  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/groups/${selectedGroupId}/chat/rooms`);
      setRooms(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: '채팅방 목록을 불러오는데 실패했습니다.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  

  const handleGroupSelect = (groupId) => {
    setSelectedGroupId(groupId);
    setOpenGroupSelectDialog(false);
    setCurrentRoom(null);
    setMessages([]);
    setRooms([]);
  };

  const subscribeToRoom = (roomId) => {
    if (!wsConnected) {
      setSnackbar({
        open: true,
        message: '채팅 서버에 연결되어 있지 않습니다.',
        severity: 'warning',
      });
      return;
    }

    if (currentSubscription.current) {
      currentSubscription.current.unsubscribe();
    }

    currentSubscription.current = stompClient.current.subscribe(
        `/topic/room.${roomId}`,
        (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);
            setMessages((prev) => {
              const isDuplicate = prev.some(
                  (msg) =>
                      msg.senderName === receivedMessage.senderName &&
                      msg.timestamp === receivedMessage.timestamp &&
                      msg.content === receivedMessage.content
              );

              if (!isDuplicate) {
                return [...prev, receivedMessage];
              }
              return prev;
            });
          } catch (error) {
            console.error('메시지 처리 실패:', error);
          }
        }
    );
  };

  const handleRoomSelect = async (room) => {
    if (currentRoom && stompClient.current && currentRoom.id !== room.id) {
      const leaveMessage = {
        roomId: currentRoom.id,
        senderName: localStorage.getItem('userEmail'),
        type: 'LEAVE',
        content: '',
        timestamp: new Date().toISOString()
      };

      stompClient.current.publish({
        destination: '/app/chat.leave',
        body: JSON.stringify(leaveMessage)
      });

      if (currentSubscription.current) {
        currentSubscription.current.unsubscribe();
      }
    }

    setCurrentRoom(room);
    loadMessages(room.id);

    if (wsConnected) {
      // 새로운 방 입장
      const joinMessage = {
        roomId: room.id,
        senderName: localStorage.getItem('userEmail'),
        type: 'JOIN',
        content: '',
        timestamp: new Date().toISOString()
      };

      subscribeToRoom(room.id);

      setTimeout(() => {
        stompClient.current.publish({
          destination: '/app/chat.sendMessage',
          body: JSON.stringify(joinMessage)
        });
      }, 100);
    }
  };



  const loadMessages = async (roomId) => {
    setLoading(true);
    try {
      const response = await axios.get(
          `/api/groups/${selectedGroupId}/chat/rooms/${roomId}/messages`
      );
      // 메시지를 timestamp 기준으로 오름차순 정렬
      const sortedMessages = response.data.sort((a, b) =>
          new Date(a.timestamp) - new Date(b.timestamp)
      );
      setMessages(sortedMessages);
    } catch (error) {
      setSnackbar({
        open: true,
        message: '메시지를 불러오는데 실패했습니다.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };


  const sendMessage = async () => {
    if (!newMessage.trim() || !currentRoom) return;

    if (!wsConnected) {
      setSnackbar({
        open: true,
        message: '채팅 서버에 연결되어 있지 않습니다.',
        severity: 'error',
      });
      return;
    }

    try {
      const messageObj = {
        roomId: currentRoom.id,
        content: newMessage.trim(),
        type: 'CHAT',
        senderName: localStorage.getItem('userEmail'), // 이메일을 사용
        timestamp: new Date().toISOString(),
      };

      console.log('전송 메시지:', messageObj);

      // WebSocket으로 메시지 전송
      stompClient.current.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(messageObj),
      });

      // 여기서 setMessages로 직접 추가하지 않는쪽으로....
      setNewMessage('');
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      setSnackbar({
        open: true,
        message: '메시지 전송에 실패했습니다.',
        severity: 'error',
      });
    }
  };


  const createRoom = async () => {
    if (!newRoomName.trim()) {
      setSnackbar({
        open: true,
        message: '채팅방 이름을 입력해주세요.',
        severity: 'warning'
      });
      return;
    }

    try {
      const response = await axios.post(
          `/api/groups/${selectedGroupId}/chat/rooms`,
          { roomName: newRoomName }
      );
      setRooms([...rooms, response.data]);
      setNewRoomName('');
      setOpenNewRoomDialog(false);
      setSnackbar({
        open: true,
        message: '채팅방이 생성되었습니다.',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: '채팅방 생성에 실패했습니다.',
        severity: 'error'
      });
    }
  };

  const handleDeleteRoom = (roomId) => {
    setConfirmDialog({
      open: true,
      roomId: roomId,
    });
  };

  const deleteRoom = async (roomId) => {
    try {
      await axios.delete(`/api/groups/${selectedGroupId}/chat/rooms/${roomId}`);
      setRooms(rooms.filter(room => room.id !== roomId));
      if (currentRoom?.id === roomId) {
        setCurrentRoom(null);
        setMessages([]);
      }
      setSnackbar({
        open: true,
        message: '채팅방이 삭제되었습니다.',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: '채팅방 삭제에 실패했습니다.',
        severity: 'error'
      });
    }
  };
  return (
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl">
          <ChatWrapper>
            <ChatContainer>
              <ChatRoomsList elevation={0}>
                <Box p={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button
                        onClick={() => setOpenGroupSelectDialog(true)}
                        startIcon={<GroupIcon />}
                        sx={{ color: '#2C3E50' }}
                    >
                      {studyGroups.find(g => g.id === selectedGroupId)?.title || '스터디 그룹 선택'}
                    </Button>
                    {selectedGroupId && (
                        <IconButton
                            onClick={() => setOpenNewRoomDialog(true)}
                            sx={{ color: '#B19CD9' }}
                        >
                          <AddIcon />
                        </IconButton>
                    )}
                  </Box>
                </Box>
                <List sx={{ overflow: 'auto', flex: 1 }}>
                  {loading ? (
                      <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                      </Box>
                  ) : (
                      rooms.map((room) => (
                          <ListItem
                              key={room.id}
                              button
                              selected={currentRoom?.id === room.id}
                              onClick={() => handleRoomSelect(room)}
                          >
                            <ListItemText
                                primary={room.roomName}
                                secondary={`메시지 ${room.messageCount}개`}
                            />
                            {!room.isDefault && (
                                <IconButton
                                    size="small"
                                    color="error"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteRoom(room.id);
                                    }}
                                >
                                  <DeleteIcon />
                                </IconButton>
                            )}
                          </ListItem>
                      ))
                  )}
                </List>
              </ChatRoomsList>

              <MessageArea elevation={0}>
                {currentRoom ? (
                    <>
                      <Box p={2} sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography variant="h6" sx={{ color: '#2C3E50' }}>
                          {currentRoom.roomName}
                        </Typography>
                      </Box>
                      <MessagesContainer>
                        {loading ? (
                            <Box display="flex" justifyContent="center" p={3}>
                              <CircularProgress />
                            </Box>
                        ) : (
                            <>
                              {messages.map((msg) => {
                                const currentUserEmail = localStorage.getItem('userEmail');
                                const isOwn = msg.senderName === currentUserEmail;

                                // 입장/퇴장 메시지
                                if (msg.type === 'JOIN' || msg.type === 'LEAVE') {
                                  const messageText = msg.type === 'JOIN' ? '입장하셨습니다.' : '퇴장하셨습니다.';
                                  return (
                                      <Box
                                          key={`${msg.timestamp}-${msg.senderName}-${msg.type}`}
                                          sx={{
                                            textAlign: 'center',
                                            py: 1,
                                          }}
                                      >
                                        <Typography
                                            variant="body2"
                                            sx={{
                                              color: 'text.secondary',
                                              backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                              py: 0.5,
                                              px: 2,
                                              borderRadius: 1,
                                              display: 'inline-block'
                                            }}
                                        >
                                          {`${msg.senderName} 님이 ${messageText}`}
                                        </Typography>
                                      </Box>
                                  );
                                }
                                return (
                                    <Message key={msg.id || `${msg.timestamp}-${msg.senderName}`} isOwn={isOwn}>
                                      <Box sx={{ p: 1 }}>
                                        {!isOwn && (
                                            <Box className="message-meta">
                                              <Avatar>{msg.senderName[0]}</Avatar>
                                              <Typography variant="subtitle2">
                                                {msg.senderName}
                                              </Typography>
                                            </Box>
                                        )}
                                        <MessageBubble isOwn={isOwn}>
                                          <Typography className="message-content">
                                            {msg.content}
                                          </Typography>
                                          <Typography className="message-time">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                          </Typography>
                                        </MessageBubble>
                                      </Box>
                                    </Message>
                                );
                              })}
                              <div ref={messagesEndRef} />
                            </>
                        )}
                      </MessagesContainer>
                      <MessageInputContainer>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="메시지를 입력하세요"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                            disabled={!wsConnected}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&.Mui-focused fieldset': {
                                  borderColor: '#B19CD9',
                                },
                              },
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            onClick={sendMessage}
                            disabled={!wsConnected}
                        >
                          전송
                        </Button>
                      </MessageInputContainer>
                    </>
                ) : (
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                      <Typography variant="h6" color="textSecondary">
                        {selectedGroupId ? '채팅방을 선택해주세요' : '스터디 그룹을 선택해주세요'}
                      </Typography>
                    </Box>
                )}
              </MessageArea>
            </ChatContainer>
          </ChatWrapper>

          <Dialog
              open={openGroupSelectDialog}
              onClose={() => setOpenGroupSelectDialog(false)}
              PaperProps={{
                sx: {
                  borderRadius: '12px',
                  minWidth: '400px'
                }
              }}
          >
            <DialogTitle>
              <Typography variant="h6" sx={{ color: '#2C3E50' }}>
                스터디 그룹 선택
              </Typography>
            </DialogTitle>
            <DialogContent>
              {studyGroups.length > 0 ? (
                  <List sx={{ pt: 1 }}>
                    {studyGroups.map((group) => (
                        <ListItem
                            key={group.id}
                            button
                            onClick={() => handleGroupSelect(group.id)}
                            sx={{
                              borderRadius: '8px',
                              mb: 1,
                              '&:hover': {
                                backgroundColor: '#F2ECFF',
                              },
                            }}
                        >
                          <ListItemText
                              primary={
                                <Typography variant="subtitle1" sx={{ color: '#2C3E50' }}>
                                  {group.title}
                                </Typography>
                              }
                              secondary={
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    {group.description}
                                  </Typography>
                                  <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                    <Chip
                                        size="small"
                                        label={`멤버 ${group.currentMember}/${group.maxMembers}`}
                                        sx={{ backgroundColor: '#F2ECFF', color: '#B19CD9' }}
                                    />
                                    <Chip
                                        size="small"
                                        label={group.status}
                                        sx={{
                                          backgroundColor: group.status === 'ONGOING' ? '#E8F5E9' : '#FFEBEE',
                                          color: group.status === 'ONGOING' ? '#4CAF50' : '#F44336'
                                        }}
                                    />
                                  </Box>
                                </Box>
                              }
                          />
                        </ListItem>
                    ))}
                  </List>
              ) : (
                  <Box sx={{
                    py: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    <Typography color="text.secondary">
                      참여 중인 스터디 그룹이 없습니다.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {/* 스터디 그룹 찾기 페이지로 이동 */}}
                    >
                      스터디 그룹 찾기
                    </Button>
                  </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                  onClick={() => setOpenGroupSelectDialog(false)}
                  sx={{ color: '#B19CD9' }}
              >
                닫기
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
              open={openNewRoomDialog}
              onClose={() => setOpenNewRoomDialog(false)}
              PaperProps={{
                sx: { borderRadius: '12px' }
              }}
          >
            <DialogTitle>새 채팅방 만들기</DialogTitle>
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  label="채팅방 이름"
                  fullWidth
                  value={newRoomName}
                  onChange={(e) => setNewRoomName(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': {
                        borderColor: '#B19CD9',
                      },
                    },
                  }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenNewRoomDialog(false)}>
                취소
              </Button>
              <Button
                  onClick={createRoom}
                  variant="contained"
                  color="primary"
              >
                생성
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
              open={confirmDialog.open}
              onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
              PaperProps={{
                sx: { borderRadius: '12px' }
              }}
          >
            <DialogTitle>채팅방 삭제</DialogTitle>
            <DialogContent>
              <Typography>정말로 이 채팅방을 삭제하시겠습니까?</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}>
                취소
              </Button>
              <Button
                  onClick={() => {
                    deleteRoom(confirmDialog.roomId);
                    setConfirmDialog({ ...confirmDialog, open: false });
                  }}
                  color="error"
                  variant="contained"
              >
                삭제
              </Button>
            </DialogActions>
          </Dialog>
          
          <Snackbar
              open={snackbar.open}
              autoHideDuration={6000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </Container>
      </ThemeProvider>
  );
}

export default TeamChat;