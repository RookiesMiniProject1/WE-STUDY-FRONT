import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Box,
    Paper,
    styled,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    AppBar,
    Toolbar,
    Typography,
    Alert,
    Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const StyledCalendarContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    maxWidth: 1200,
    margin: '0 auto',
    '& .fc': {
        height: '70vh',
        backgroundColor: '#fff',
    },
    '& .fc-toolbar-title': {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    '& .fc-button': {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
    '& .fc-view-harness': {
        backgroundColor: '#fff',
        minHeight: '500px',
    },
}));

const Calendar = () => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const [formData, setFormData] = useState({
        title: '',
        type: 'PERSONAL',
        startDate: '',
        endDate: '',
        description: ''
    });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({
            open: true,
            message,
            severity
        });
    };

    // API 호출 함수들
    const fetchEvents = async (fetchInfo) => {
        try {
            setLoading(true);
            const response = await api.get(`/api/calendar?start=${fetchInfo.startStr}&end=${fetchInfo.endStr}`);
            const formattedEvents = response.data.map(event => ({
                id: event.id,
                title: event.title,
                start: event.startDate,
                end: event.endDate,
                backgroundColor: 
                    event.type === 'PERSONAL' ? '#4CAF50' :
                    event.type === 'GROUP' ? '#2196F3' : '#FF5722',
                type: event.type,
                content: event.content,
                groupId: event.groupId,
                groupTitle: event.groupTitle
            }));
            setEvents(formattedEvents);
        } catch (error) {
            showSnackbar('일정을 불러오는데 실패했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const createEvent = async (eventData) => {
        try {
            const response = await api.post('/api/calendar', eventData);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            await api.delete(`/api/calendar/${eventId}`);
        } catch (error) {
            throw error;
        }
    };

    const handleEventAdd = (selectInfo) => {
        setFormData({
            ...formData,
            startDate: selectInfo.startStr,
            endDate: selectInfo.endStr
        });
        setOpenDialog(true);
    };

    const handleSubmit = async () => {
        try {
            const scheduleData = {
                title: formData.title,
                content: formData.description,
                startDate: formData.startDate,
                endDate: formData.endDate,
                groupId: formData.type === 'GROUP' ? formData.groupId : null,
                taskId: formData.type === 'TASK' ? formData.taskId : null
            };

            const response = await createEvent(scheduleData);
            
            const newEvent = {
                id: response.id,
                title: response.title,
                start: response.startDate,
                end: response.endDate,
                backgroundColor: 
                    response.type === 'PERSONAL' ? '#4CAF50' :
                    response.type === 'GROUP' ? '#2196F3' : '#FF5722',
                type: response.type
            };

            setEvents(prev => [...prev, newEvent]);
            setOpenDialog(false);
            setFormData({
                title: '',
                type: 'PERSONAL',
                startDate: '',
                endDate: '',
                description: ''
            });
            showSnackbar('일정이 성공적으로 추가되었습니다.');
        } catch (error) {
            showSnackbar('일정 추가에 실패했습니다.', 'error');
        }
    };

    const handleEventDelete = async (eventId) => {
        try {
            await deleteEvent(eventId);
            setEvents(prev => prev.filter(event => event.id !== eventId));
            showSnackbar('일정이 삭제되었습니다.');
        } catch (error) {
            showSnackbar('일정 삭제에 실패했습니다.', 'error');
        }
    };

    return (
        <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        캘린더
                    </Typography>
                    <Button color="inherit" onClick={() => navigate('/main')}>
                        메인
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/mygroups')}>
                        내 그룹
                    </Button>
                    <Button color="inherit" onClick={() => navigate('/mypage')}>
                        마이페이지
                    </Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 3, flexGrow: 1, overflow: 'auto' }}>
                <StyledCalendarContainer elevation={3}>
                    <Box sx={{ mb: 2, display: 'flex', gap: 1 }}>
                        <Chip label="개인 일정" sx={{ bgcolor: '#4CAF50', color: 'white' }} />
                        <Chip label="그룹 일정" sx={{ bgcolor: '#2196F3', color: 'white' }} />
                        <Chip label="과제 일정" sx={{ bgcolor: '#FF5722', color: 'white' }} />
                    </Box>

                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        events={events}
                        selectable={true}
                        select={handleEventAdd}
                        datesSet={fetchEvents}
                        loading={loading}
                        height="auto"
                        aspectRatio={1.8}
                    />
                </StyledCalendarContainer>

                <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
                    <DialogTitle>새 일정 추가</DialogTitle>
                    <DialogContent>
                        <Box sx={{ mt: 2 }}>
                            <TextField
                                fullWidth
                                label="제목"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                margin="normal"
                            />

                            <FormControl fullWidth margin="normal">
                                <InputLabel>일정 유형</InputLabel>
                                <Select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <MenuItem value="PERSONAL">개인 일정</MenuItem>
                                    <MenuItem value="GROUP">그룹 일정</MenuItem>
                                    <MenuItem value="TASK">과제 일정</MenuItem>
                                </Select>
                            </FormControl>

                            <TextField
                                fullWidth
                                label="시작 시간"
                                type="datetime-local"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                fullWidth
                                label="종료 시간"
                                type="datetime-local"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                margin="normal"
                                InputLabelProps={{ shrink: true }}
                            />

                            <TextField
                                fullWidth
                                label="설명"
                                multiline
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                margin="normal"
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>취소</Button>
                        <Button onClick={handleSubmit} variant="contained" color="primary">
                            추가
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={6000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                >
                    <Alert 
                        onClose={() => setSnackbar({ ...snackbar, open: false })} 
                        severity={snackbar.severity}
                    >
                        {snackbar.message}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Calendar;