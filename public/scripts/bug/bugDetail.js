let selectedDeveloperId = "";
let selectedDeveloperName = "";
const bugId = extractIdFromUrl();

document.addEventListener("DOMContentLoaded", function () {
  fetchAndDisplayBugDetails(bugId);
  setupEventListeners();
  accessControl();
});

async function fetchAndDisplayBugDetails(bugId) {
  try {
    const response = await axiosInstance.get(`/api/bugs/${bugId}`);
    const bug = response.data;
    updateBugDetailsUI(bug);
    fetchAndDisplayDevelopers(bug.projectId);
  } catch (error) {
    console.error("Error fetching bug details:", error);
    // Optionally, update the UI to show an error message
  }
}

function updateBugDetailsUI(bug) {

  if (bug.assignedTo != null) {
    document.querySelector("#assignee-name").textContent = bug.assignedTo.name;
  }

  document.querySelector("#name").textContent = bug.name;
  document.querySelector("#text").textContent = bug.description;
  document.querySelector("#status-level").textContent = bug.status;
  document.querySelector("#reporter-name").textContent = bug.reportedBy.name;
  document.querySelector("#date").textContent = new Date(bug.reportTime).toLocaleDateString();
  document.querySelector("#steps").textContent = bug.stepsToReproduce;
  document.getElementById("deadline").textContent = new Date(bug.deadline).toLocaleDateString();
  document.getElementById("priority").textContent = bug.priority;
  document.getElementById("severity").textContent = bug.severity;

  setStatusDropdown(document.querySelector("#status"), bug.status);

  if (bug.resolvedTime) {
    document.querySelector("#resolved").textContent = new Date(bug.resolvedTime).toLocaleDateString();
  }
}

function accessControl() {
  // Hide from developer
  hideFrom('inReivewStatus', 'Developer');
  hideFrom('closedStatus', 'Developer');
  hideFrom('assignDeveloperButton', 'Developer');

  // Hide from manager
  hideFrom('todoStatus', 'Manager');
  hideFrom('inProgressStatus', 'Manager');
  hideFrom('resolvedStatus', 'Manager');
}

function setupEventListeners() {
  document.getElementById("assignDeveloperButton").addEventListener("click", showModal);
  document.getElementById("hideModal").addEventListener("click", hideModal);
  document.getElementById("saveStatus").addEventListener("click", saveStatus);
  document.getElementById('confirmAssign').addEventListener('click', confirmAssignment);
}

function showModal() {
  document.getElementById("assignDeveloperModal").classList.remove("hidden");
  document.getElementById("assignDeveloperModal").classList.add("flex");
}

function hideModal() {
  document.getElementById("assignDeveloperModal").classList.add("hidden");
  document.getElementById("assignDeveloperModal").classList.remove("flex");
}

function saveStatus() {
  const selectedStatus = document.querySelector("#status").value;
  const bugId = extractIdFromUrl();
  updateBugStatus(bugId, selectedStatus);
}

async function updateBugStatus(bugId, newStatus) {
  try {
    const response = await axiosInstance.patch(`/api/bugs/update/${bugId}`, { status: newStatus });
    console.log("Status Updated: ", response.data);

    // Show the popup with a callback to reload the current page
    showPopup('Changing Status', "Bug's Status changed to " + newStatus, function () {
      fetchAndDisplayBugDetails(bugId);
    });
  } catch (error) {
    console.error("Error updating status: ", error);
    alert("Failed to update status. Please try again.");
  }
}

async function fetchAndDisplayDevelopers(projectId) {
  try {
    const response = await axiosInstance.get(`/api/projects/dev/${projectId}`);
    const developers = response.data;
    const developerListElement = document.getElementById("developerList");
    renderMemberList(developerListElement, developers)

  } catch (error) {
    console.error("Error fetching developers:", error);
  }
}

function renderMemberList(element, members) {
  // Clear existing element
  element.innerHTML = '';

  for (const developer of members) {
    const { _id, name, developerType } = developer;

    // Create radio button
    const radioInput = document.createElement('input');
    radioInput.type = 'radio';
    radioInput.id = _id;
    radioInput.name = 'developer';
    radioInput.value = _id;
    radioInput.classList.add('hidden', 'peer');

    // Create label
    const memberLabel = document.createElement('label');
    memberLabel.setAttribute('for', _id);
    memberLabel.classList.add(
      'inline-flex',
      'items-center',
      'justify-between',
      'w-full',
      'h-full',
      'p-2',
      'text-gray-500',
      'bg-white',
      'border-2',
      'border-gray-200',
      'rounded-lg',
      'cursor-pointer',
      'hover:text-gray-600',
      'peer-checked:border-blue-600',
      'peer-checked:text-gray-600',
      'hover:bg-gray-50'
    );

    // Create content container
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('block');

    // Create name and developer type elements
    const nameElement = document.createElement('div');
    nameElement.classList.add('w-full', 'text-lg', 'font-semibold');
    nameElement.textContent = name;

    const developerTypeElement = document.createElement('div');
    developerTypeElement.classList.add('w-full', 'text-sm');
    developerTypeElement.textContent = `Developer Type: ${developerType ? developerType : 'N/A'}`;

    // Add elements to content container and label
    contentDiv.appendChild(nameElement);
    contentDiv.appendChild(developerTypeElement);
    memberLabel.appendChild(contentDiv);
    const labelDiv = document.createElement('div');
    labelDiv.classList.add('w-full', 'flex', 'items-center', 'h-full');
    labelDiv.appendChild(radioInput);
    labelDiv.appendChild(memberLabel);

    // Add event listener for radio button selection
    radioInput.addEventListener('change', () => {
      selectedDeveloperId = _id;
      selectedDeveloperName = name;
      console.log(`Selected ID: ${selectedDeveloperId}`);
    });

    // Append the whole structure to the main element
    element.appendChild(labelDiv);
  }
}




function confirmAssignment() {
  if (!selectedDeveloperId) {
    alert('Please select a developer first.');
    return;
  }
  console.log("Confirm selection ID: " + selectedDeveloperId);
  console.log("Confirm selection name: " + selectedDeveloperName);
  assignDeveloper(selectedDeveloperId, selectedDeveloperName);
}

async function assignDeveloper(developerId, developerName) {
  const bugId = extractIdFromUrl();
  try {
    const response = await axiosInstance.patch(`/api/bugs/update/${bugId}`, {
      assignedTo: {
        _id: developerId,
        name: developerName
      }
    });
    console.log('Developer assigned successfully!', response);

    // Hide the 'assignDeveloperModal' modal
    hideModal();

    // Show the popup with a callback to reload the current page
    showPopup('Assigning Developer', 'Developer ' + selectedDeveloperName + ' has been assigned to this bug', function () {
      fetchAndDisplayBugDetails(bugId);
    })
  } catch (error) {
    console.error('Error assigning developer:', error);
  }
}

function setStatusDropdown(dropdown, currentStatus) {
  const options = dropdown.options;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value === currentStatus) {
      dropdown.selectedIndex = i;
      break;
    }
  }
}
