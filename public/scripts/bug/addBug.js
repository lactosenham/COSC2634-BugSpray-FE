document.getElementById('addBugForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // var projectId = document.getElementById('projectId').value;
    var priority = document.getElementById('priority').value;
    var severity = document.getElementById('severity').value;
    var name = document.getElementById('name').value;
    var description = document.getElementById('description').value;
    var stepsToReproduce = document.getElementById('stepsToReproduce').value;
    var deadline = document.getElementById('deadline').value;

    var bugData = {

        // Place holder projectId
        projectId: "657ab93d72fd30ada0105ba7",
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
        })
        .catch (function (error) {
            console.log('Error Reporting Bug: ', error.response.data);
        })
})