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
             console.log('Login successful', response);
             // Redirect or update UI as needed
         })
         .catch(function (error) {
             console.log('Login error:', error);
             // Handle error (e.g., show error message)
         });
});
