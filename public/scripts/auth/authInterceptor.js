const axiosInstance = axios.create({
    baseURL:'',
});

axiosInstance.interceptors.request.use(
    config => {
      showLoadingPopup();
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      hideLoadingPopup();
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    response => {
      hideLoadingPopup();
        console.log('Success: ', response.data);
        return response;
    },
    error => {
      if (error.response && error.response.status === 401) {
        // Redirect to login page
        window.location.href = '/login';
      }
      hideLoadingPopup();
      return Promise.reject(error);
    }
  );

  // Counter for active requests
var activeRequests = 0;

function showLoadingPopup() {
    if (activeRequests === 0) {
        showPopup('Loading...', 'Please wait', function() {});
    }
    activeRequests++;
}

function hideLoadingPopup() {
    activeRequests--;
    if (activeRequests <= 0) {
        activeRequests = 0; // Reset the counter to prevent negative values
        closePopup();
    }
}