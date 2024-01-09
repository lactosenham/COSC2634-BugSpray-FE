// Define a global flag to track if the event listener has already been added
let isInitialized = false;

document.addEventListener('DOMContentLoaded', function () {
    if (!isInitialized) {
        // Set the flag to true to prevent future execution
        isInitialized = true;

        const projectId = extractIdFromUrl();
        fetchProjectDetails(projectId);
        hideFrom("member", "Developer")
        hideFrom("editProject", "Developer")

        var backToListButton = document.getElementById('back-to-list');
        if (backToListButton) {
            backToListButton.addEventListener('click', function () {
                window.location.href = '/projects';
            });
        }
    }
});

function fetchProjectDetails(projectId) {

    fetchAndDisplayProjectDetails(projectId);
    fetchAndDisplayDevelopers(projectId);
    fetchAndDisplayBugs(projectId);

}

async function fetchAndDisplayProjectDetails(projectId) {
    try {
        const response = await axiosInstance.get(`/api/projects/${projectId}`);
        const project = response.data;

        // Display the project details
        document.getElementById('project-name').innerText = project.name;
        document.getElementById('project-des').innerText = project.description;
        document.getElementById('total-ticket').innerText = project.bugs.length;

    } catch (error) {
        console.error('Error fetching project details:', error);
    }
}

function fetchAndDisplayDevelopers(projectId) {
    axiosInstance.get(`/api/projects/dev/${projectId}`)
        .then(response => {
            const developers = response.data;
            const developersContainer = document.querySelector('.members-container'); // Add this class to the div where developers will be displayed
            developersContainer.innerHTML = '';
            developers.forEach(dev => {
                developersContainer.innerHTML += createPersonnelCard(dev, 'Developer');
            });
        })
        .catch(error => {
            console.error('Error fetching developers:', error);
        });
}

function fetchAndDisplayBugs(projectId) {
    axiosInstance.get(`/api/bugs/project/${projectId}`)
        .then(response => {
            const bugs = response.data;
            const bugsContainer = document.querySelector('.bugs-container');
            const bugsTotal = document.getElementById('total-ticket');
            const bugsIncomplete = document.getElementById('incomplete-ticket');

            // Clear the existing content 
            bugsContainer.innerHTML = '';
            bugsTotal.innerText = '';
            bugsIncomplete.innerText = '';

            // Populate with new data
            bugs.forEach(bug => {
                bugsContainer.innerHTML += createBugCard(bug);
            });

            bugsTotal.innerText = bugs.length;
            bugsIncomplete.innerText = getIncompleteNum(bugs);
        })
        .catch(error => {
            console.error('Error fetching bugs:', error);
            // Optionally, you could update the container to show an error message
            bugsContainer.innerHTML = '<p>Error loading bugs.</p>';
        });
}

function getIncompleteNum(bugs) {
    var incompleteNum = 0;

    bugs.forEach(bug => {
        if (bug.status !== 'Closed') {
            incompleteNum++;
        }
    });

    return incompleteNum;
}

