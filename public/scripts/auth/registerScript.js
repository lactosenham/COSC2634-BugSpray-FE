document.addEventListener('DOMContentLoaded', function() {
    // Get the role select element and role-specific info fields
    const roleSelect = document.querySelector('#role');
    const roleInfos = {
        'Developer': document.querySelectorAll('.developer-info'),
    };

    // Function to update the display and required status of role-specific fields
    function updateRoleFields() {
        // hide all role-specific fields
        document.querySelectorAll('.role-info').forEach(info => info.style.display = 'none');
        // remove the required attribute from all role-specific fields
        document.querySelectorAll('.role-info select').forEach(select => select.removeAttribute('required'));

        // show the selected role's fields and set them as required
        if (roleSelect.value in roleInfos) {
            roleInfos[roleSelect.value].forEach(info => {
                info.style.display = 'block';
                // if the field is a select element, make it required
                if (info.tagName === 'SELECT') {
                    info.setAttribute('required', '');
                }
            });
        }
    }

    // Initialize role fields on load and listen for changes on the role select element
    updateRoleFields();
    roleSelect.addEventListener('change', updateRoleFields);

    // Send Registration Form Data to backend
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var name = document.getElementById('name').value;
        var role = roleSelect.value; // Use the roleSelect variable
        var developerType = document.getElementById('developerType').value;

        // Check if selected role is not Developer
        if (role !== "Developer") {
            developerType = null; 
        }

        var registrationData = {
            username: username,
            password: password,
            name: name,
            role: role,
            developerType: developerType
        };

        // Update the URL to use the proxy path and send the registration data
        axios.post('/api/auth/register', registrationData)
            .then(function (response) {
                showPopup('Register', 'User ' + response.username + ' registered' , function() {
                    window.location.href = '/login';
                });
            })
            .catch(function (error) {
                showPopup('Register Error', error.response.data, function() {
                });
            });
    });
});
