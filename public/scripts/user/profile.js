document.addEventListener('DOMContentLoaded', function() {
    hideFrom('developerType', 'Manager');
    fetchUserProfile();
    setupProfileUpdateForm();
});

let userId = '';
// Function to fetch user profile and populate form fields
async function fetchUserProfile() {
    try {
        const response = await axiosInstance.get('/api/user/profile');
        const userProfile = response.data;
        userId = response.data._id;
        
        document.getElementById('username').value = userProfile.username || '';
        document.getElementById('name').value = userProfile.name || '';
        document.getElementById('role').value = userProfile.role || '';
        document.getElementById('developerType').value = userProfile.developerType || 'Front-end'; // Default to 'Front-end' if not specified
    } catch (error) {
        console.error('Error fetching user profile:', error);
        // Handle the error, e.g., show a message to the user
    }
}

// Function to setup form submission for updating user profile
function setupProfileUpdateForm() {
    const form = document.getElementById('profileForm');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const updatedProfile = {
            username: document.getElementById('username').value,
            name: document.getElementById('name').value,
            role: document.getElementById('role').value,
            developerType: document.getElementById('developerType').value
        };

        try {
            const response = await axiosInstance.patch(`/api/user/update`, updatedProfile);
            console.log('Profile updated:', response.data);

            showPopup('Edit Profile', 'Profile Successfully Changed \n Sign in again', function() {
                fetchUserProfile();
                // window.location.href = '/login';
            });
            
        } catch (error) {
            console.error('Error updating profile:', error);
            // Handle the error, e.g., show an error message to the user
        }
    });
}
