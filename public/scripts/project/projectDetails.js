document.addEventListener('DOMContentLoaded', function() {
    const projectId = extractProjectIdFromUrl();
    fetchProjectDetails(projectId);
});

function extractProjectIdFromUrl() {
    // Extract the project ID from the URL
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.length - 1]; // Assuming the last segment is the project ID
}

function fetchProjectDetails(projectId) {
    axiosInstance.get(`/api/projects/${projectId}`)
        .then(response => {
            const project = response.data;
            displayProjectDetails(project);
        })
        .catch(error => {
            console.error('Error fetching project details:', error);
            // Handle the error, e.g., show an error message
        });
}

function displayProjectDetails(project) {
    // Update the EJS template elements with the project data
    document.getElementById('project-name').innerText = project.name;
    document.getElementById('project-des').innerText = project.description;
    // Similarly, update other elements like bugs, managers, etc.
}
