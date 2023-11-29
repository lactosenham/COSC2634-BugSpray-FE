// Get the role select element and vendor info input fields
const roleSelect = document.querySelector('#role');
const roleInfos = {
    'Developer': document.querySelectorAll('.developer-info'),
};

// Listen for changes on the role select element
roleSelect.addEventListener('change', function () {
    // hide all role-specific fields
    document.querySelectorAll('.role-info').forEach(info => info.style.display = 'none');
    // show the selected role's fields
    if (this.value in roleInfos) {
        roleInfos[this.value].forEach(info => info.style.display = 'block');
    }
});


// Send Registration Form Data to backend
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var role = document.getElementById('role').value;
    var developerType = document.getElementById('developerType').value;

    var registrationData = {
        username: username,
        password: password,
        name: name,
        role: role,
        developerType: developerType
    };

    // Update the URL to use the proxy path
    axios.post('/api/auth/register', registrationData)
         .then(function (response) {
             console.log('Registration successful', response);
             // Redirect or update UI as needed
         })
         .catch(function (error) {
             console.log('Registration error:', error);
             // Handle error (e.g., show error message)
         });
});
