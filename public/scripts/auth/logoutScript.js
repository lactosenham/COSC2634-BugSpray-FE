document.getElementById('logout').addEventListener('click', function(e) {
    logout();
})

function logout() {
    // Remove token and role from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('role');

    // Pass a callback function to redirect after the popup is closed
    showPopup('Logout', "Loggin out", function() {
        window.location.href = '/login';
    });
}
