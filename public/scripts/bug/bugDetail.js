document.addEventListener("DOMContentLoaded", function () {
  const bugId = getBugIdFromURL();
  fetchAndDisplayBugDetails(bugId);
  setupEventListeners();
});

function fetchAndDisplayBugDetails(bugId) {
  axiosInstance.get(`/api/bugs/${bugId}`)
      .then(function (response) {
          const bug = response.data;
          updateBugDetailsUI(bug);
          fetchAndDisplayDevelopers(bug.projectId);
      })
      .catch(function (error) {
          console.error("Error fetching bug details:", error);
      });
}

function updateBugDetailsUI(bug) {
  document.querySelector("#name").textContent = bug.name;
  document.querySelector("#text").textContent = bug.description;
  setStatusDropdown(document.querySelector("#status"), bug.status);
  document.querySelector("#status-level").textContent = bug.status;
  document.querySelector("#reporter-name").textContent = bug.reportedBy.name;
  document.querySelector("#assignee-name").textContent = bug.assignedTo.name;
  document.querySelector("#date").textContent = new Date(bug.reportTime).toLocaleDateString();
  document.querySelector("#steps").textContent = bug.stepsToReproduce;
  document.querySelector("#deadline").textContent = new Date(bug.deadline).toLocaleDateString();
  document.querySelector("#priority").textContent = bug.priority;
  document.querySelector("#severity").textContent = bug.severity;

  if (bug.resolvedTime) {
      document.querySelector("#resolved").textContent = new Date(bug.resolvedTime).toLocaleDateString();
  }
}

function setupEventListeners() {
  document.getElementById("assignDeveloperButton").addEventListener("click", showPopup);
  document.getElementById("closePopup").addEventListener("click", closePopup);
  document.getElementById("saveStatus").addEventListener("click", saveStatus);
  document.getElementById('confirmAssign').addEventListener('click', confirmAssignment);
}

function showPopup() {
  document.getElementById("developerPopup").classList.remove("hidden");
}

function closePopup() {
  document.getElementById("developerPopup").classList.add("hidden");  
}

function saveStatus() {
  const selectedStatus = document.querySelector("#status").value;
  const bugId = getBugIdFromURL();
  updateBugStatus(bugId, selectedStatus);
}

async function updateBugStatus(bugId, newStatus) {
  try {
      const response = await axiosInstance.patch(`/api/bugs/update/${bugId}`, { status: newStatus });
      console.log("Status Updated: ", response.data);
  } catch (error) {
      console.error("Error updating status: ", error);
      alert("Failed to update status. Please try again.");
  }
}

function getBugIdFromURL() {
  const currentURL = new URL(window.location.href);
  return currentURL.pathname.split("/").pop();
}

let selectedDeveloperId = null;

async function fetchAndDisplayDevelopers(projectId) {
  try {
      const response = await axiosInstance.get(`/api/projects/dev/${projectId}`);
      const developers = response.data;
      const developerListElement = document.getElementById("developerList");
      developerListElement.innerHTML = "";

      developers.forEach((developer) => {
          const radioInput = createRadioInput(developer);
          const developerLabel = createDeveloperLabel(developer, radioInput);
          developerListElement.appendChild(developerLabel);
      });
  } catch (error) {
      console.error("Error fetching developers:", error);
  }
}

function createRadioInput(developer) {
  const radioInput = document.createElement('input');
  radioInput.type = 'radio';
  radioInput.id = developer._id;
  radioInput.name = 'developer';
  radioInput.value = developer._id;
  radioInput.classList.add('hidden', 'peer');
  radioInput.addEventListener('change', () => selectedDeveloperId = developer._id);
  return radioInput;
}

function createDeveloperLabel(developer, radioInput) {
  const developerLabel = document.createElement('label');
  developerLabel.setAttribute('for', developer._id);
  developerLabel.className = 'inline-flex items-center justify-between w-full h-full p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-gray-600 hover:bg-gray-50';
  const nameElement = document.createElement('div');
  nameElement.className = 'w-full text-lg font-semibold';
  nameElement.textContent = developer.name;
  developerLabel.appendChild(radioInput);
  developerLabel.appendChild(nameElement);
  
  return developerLabel;
}

function confirmAssignment() {
  if (!selectedDeveloperId) {
      alert('Please select a developer first.');
      return;
  }
  assignDeveloper(selectedDeveloperId);
  closePopup();
}

async function assignDeveloper(developerId) {
  const bugId = getBugIdFromURL();
  try {
      const response = await axiosInstance.patch(`/api/bugs/update/${bugId}`, { assignedTo: developerId });
      console.log('Developer assigned successfully!', response);
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
  