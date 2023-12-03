document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var loginData = {
        username: username,
        password: password
    };

    axios.post('/api/auth/login', loginData)
         .then(function (response) {
            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                console.log('Login successful', response);
                showPopup('Login', response.data.message);
            }
         })
         .catch(function (error) {
             console.log('Login error:', error);
             // Handle error (e.g., show error message)
             showPopup('Login Error', error.response.data)
         });
});
