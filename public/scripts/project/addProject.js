document.getElementById('addProjectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('projectName').value;
    var description = document.getElementById('projectDescription').value;

    var newProjectData = {
        name: name,
        description: description
    };

    axiosInstance.post('/api/projects/create', newProjectData)
        .then(function (response) {
            if (response.data) {
                console.log('Project ' + name + ' added');

                // Close the modal with 'project-modal' as the ID
                closeModal('project-modal');

                // Show the popup with a callback to reload the current page
                showPopup('Create new Project', 'Project ' + name + ' added', function() {
                    fetchAndDisplayProjects();
                });
            }
        })
        .catch(function (error) {
            console.log('Error Adding Project', error);

            // Show the popup with a callback to reload the current page
            showPopup('Error Adding Project', error.response.data, function() {
                // Close the modal with 'project-modal' as the ID
                closeModal('project-modal');
                fetchAndDisplayProjects();
            });
        });
});