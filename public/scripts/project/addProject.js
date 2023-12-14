document.getElementById('addProjectForm').addEventListener('submit', function(e) {
    e.preventDefault();

    var name = document.getElementById('projectName').value;
    var description = document.getElementById('projectDescription').value;

    var newProjectData = {
        name: name,
        description: description
    }

    axiosInstance.post('/api/projects/create', newProjectData)
        .then(function (response) {
            if (response.data) {
                console.log('Project ' + name + ' added');
            }
        })
        .catch(function (error) {
            console.log('Error Adding Project', error);
        });
});