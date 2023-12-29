const axiosInstance = axios.create({
    baseURL:'',
});

axiosInstance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => {
        console.log('Success: ', response.data);
        return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        // Redirect to login page
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );