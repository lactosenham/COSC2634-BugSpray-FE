// Define a global flag to track if the event listener has already been added
let isInitialized = false;

document.addEventListener('DOMContentLoaded', function () {
    if (!isInitialized) {
        // Set the flag to true to prevent future execution
        isInitialized = true;

        // Place your existing code here
        const projectId = extractIdFromUrl();
        fetchProjectDetails(projectId);

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
    fetchAndDisplayManagers(projectId);
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

function fetchAndDisplayManagers(projectId) {
    // Similar to fetchAndDisplayDevelopers but fetch and display managers
    // Assuming you have an endpoint to fetch managers, similar to developers
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


function createPersonnelCard(person, role) {
    return `
        <div class="w-full px-4 py-2 md:w-1/2 lg:w-1/2 xl:w-1/2">
            <div class="flex items-center p-4 border border-gray-200 bg-[#0c4474] hover:bg-sky-400 rounded-lg">
                <div class="flex-grow">
                    <h2 class="font-medium text-white title-font">${person.name}</h2>
                    <p class="font-bold text-white">${role === 'Manager' ? 'Manager' : person.developerType}</p>
                </div>
            </div>
        </div>
    `;
}

function createBugCard(bug) {
    return `
        <div class="p-4 bg-white shadow-md rounded-lg">
        <div class="flex justify-between">
          <h3 class="text-xl font-bold text-gray-800">${bug.name}</h3>
          <span class="ml-auto italic text-gray-600">${bug.status}</span>
        </div>
          <p class="mt-2 text-gray-600">${bug.description || 'No description provided'}</p>
          <p class="py-5">
            <span class="text-sm font-semibold text-gray-700">Severity:</span>
            <span class="ml-1" style="background-color:${getColorForSeverity(bug.severity)}; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center;">${bug.severity}</span> -
            <span class="text-sm font-semibold text-gray-700">Priority:</span>
            <span class="ml-1" style="background-color:${getColorForPriority(bug.priority)}; color: white; border-radius: 50%; width: 24px; height: 24px; display: inline-flex; align-items: center; justify-content: center;">${bug.priority}</span>
          </p>
          <div class="flex justify-between">
            <div>
                <span class="font-semibold text-gray-800 mr-3">Assigned to:</span>
                <span class="text-gray-700">${bug.assignedTo ? bug.assignedTo.username : 'Unassigned'}</span>
            </div>
            <div class="text-blue-500 cursor-pointer hover:text-blue-700">
                <a href="/bugs/${bug._id}">Details →</a>
            </div>
          </div>
        </div>
    `;
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

function getColorForSeverity(severity) {
    // Return hex color based on severity level
    switch (severity) {
        case 1:
            return '#780000';
        case 2:
            return '#dc0000';
        case 3:
            return '#fd8c00';
        case 4:
            return '#fdc500';
        case 5:
            return '#00ac46';
        default:
            return '#000000';
    }
}


function getColorForPriority(priority) {
    // Return hex color based on priority level
    switch (priority) {
        case 1:
            return '#780000';
        case 2:
            return '#dc0000';
        case 3:
            return '#fd8c00';
        case 4:
            return '#fdc500';
        case 5:
            return '#00ac46';
        default:
            return '#000000';
    }
}
