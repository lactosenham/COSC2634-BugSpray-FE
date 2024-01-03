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

            // Extract and store user role
            storeUserRole(response.data.token);

            // Pass a callback function to redirect after the popup is closed
            showPopup('Login', response.data.message, function() {
                window.location.href = '/';
            });
        }
    })
    .catch(function (error) {
        console.log('Login error:', error);
        showPopup('Login Error', error.response.data, function(){});
    });
});

// Function to parse JWT, extract the role and store it in localStorage
function storeUserRole(token) {
    function parseJwt(tkn) {
        try {
            const base64Url = tkn.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (e) {
            return null;
        }
    }

    const decodedToken = parseJwt(token);
    if (decodedToken && decodedToken.role) {
        localStorage.setItem('role', decodedToken.role);
    }
}


