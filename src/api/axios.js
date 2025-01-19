import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true 
});

instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt'); 
      if (token) {
        config.headers.Authorization = token; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

instance.interceptors.response.use(
    response => {
        console.log('Response Status:', response.status);
        console.log('Response Data:', response.data);
        return response;
    },
    error => {
        console.error('Error Status:', error.response?.status);
        console.error('Error Data:', error.response?.data);
        
        if (error.response?.status === 401) {
            console.log('Unauthorized, redirecting to login...');
            localStorage.removeItem('jwt');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;