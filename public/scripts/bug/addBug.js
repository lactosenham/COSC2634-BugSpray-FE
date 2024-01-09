document.getElementById('addBugForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const projectId = extractIdFromUrl();

    var priority = document.getElementById('priority').value;
    var severity = document.getElementById('severity').value;
    var name = document.getElementById('bugName').value;
    var description = document.getElementById('bugDescription').value;
    var stepsToReproduce = document.getElementById('stepsToReproduce').value;
    var deadline = document.getElementById('deadline').value;

    var bugData = {

        // Place holder projectId
        projectId: projectId,
        priority: priority,
        severity: severity,
        name: name,
        description: description,
        stepsToReproduce: stepsToReproduce,
        deadline: deadline
    }   
    axiosInstance.post('/api/bugs/report', bugData)
    .then (function (response) {
        console.log('Bug Report: ', response.data.message);

        // Close the modal
        closeModal('bug-modal');

        // Show the popup with a callback to reload the current page
        showPopup('Add Bug', 'Bug: ' + bugData.name, function() {
            fetchAndDisplayBugs(projectId);
        });
    })
    .catch (function (error) {
        console.log('Error Reporting Bug: ', error.response.data);
    })
}) 