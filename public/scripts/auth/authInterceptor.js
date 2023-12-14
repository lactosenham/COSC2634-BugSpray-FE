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
      // Do something with response error
      return Promise.reject(error);
    }
  );