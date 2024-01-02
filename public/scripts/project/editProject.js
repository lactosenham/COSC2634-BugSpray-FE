// Function to update the project
async function updateProject() {
    // Get current project's ID
    const projectId = extractIdFromUrl();

    const updatedData = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value
    };

    try {
        const response = await axiosInstance.patch(`/api/projects/update/${projectId}`, updatedData);
        console.log('Project Updated: ', response.data);

        // Close the Modal
        closeModal('edit-project-modal');

        // Show the popup with a callback to reload the current page
        showPopup('Editing Project', 'Project Successfully Edited', function() {
            fetchAndDisplayProjectDetails(projectId);
        });
    } catch (error) {
        console.error('Error updating project: ', error);
        // Display error message
    }
}

// Function to delete the project
async function deleteProject() {
    const projectId = extractIdFromUrl(); // Function to get the project ID from the URL

    try {
        const response = await axiosInstance.delete(`/api/projects/delete/${projectId}`);
        console.log('Project Deleted: ', response.data);

        // Close the Modal
        closeModal('edit-project-modal');

        // Show the popup with a callback to reload the current page
        showPopup('Deleting Project', 'Project Successfully Deleted', function() {
            window.location.href = '/projects';
        });
    
    } catch (error) {
        console.error('Error deleting project: ', error);
        // Display error message
    }
}

// Event Listener for the Edit Project Form Submission
document.querySelector('#edit-project-modal form').addEventListener('submit', function(e) {
    e.preventDefault();
    updateProject();
});

// Event Listener for the Delete Button
document.querySelector('#edit-project-modal .delete-btn').addEventListener('click', function(e) {
    e.preventDefault();
    deleteProject();
});
