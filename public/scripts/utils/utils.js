function closeModal(modalId) {
    var modal = document.querySelector(`[data-modal-toggle="${modalId}"]`);
    if (modal) {
        modal.click();
    }
}

function extractIdFromUrl() {
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.length - 1];
}

function hideFrom(elementId, role) {
    const userRole = localStorage.getItem('role');

    // Find the element by its ID
    var element = document.getElementById(elementId);
    if (!element) return; // Exit if the element doesn't exist

    if (userRole === role) {
        element.style.display = 'none';
        // Also hide the label if it exists
        var label = document.querySelector(`label[for="${elementId}"]`);
        if (label) {
            label.style.display = 'none';
        }
    } else {
        element.style.display = 'flex';
        // Also show the label if it exists
        var label = document.querySelector(`label[for="${elementId}"]`);
        if (label) {
            label.style.display = 'flex';
        }
    }
}


function createPersonnelCard(person, role) {
    return `
        <div class="w-full px-4 py-2">
            <div class="flex items-center p-3  bg-palette-3 hover:bg-sky-400 rounded-lg">
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
                <a href="/bug-detail/${bug._id}">Details →</a>
            </div>
          </div>
        </div>
    `;
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