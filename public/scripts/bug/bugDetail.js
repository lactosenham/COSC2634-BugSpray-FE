document.addEventListener("DOMContentLoaded", function () {
  const bugId = getBugIdFromURL();
  fetchAndDisplayBugDetails(bugId);

  // Event listener to open the popup
  document
    .getElementById("assignDeveloperButton")
    .addEventListener("click", showPopup);
});

function fetchAndDisplayBugDetails(bugId) {
  axiosInstance
    .get(`/api/bugs/${bugId}`)
    .then(function (response) {
      const bug = response.data;
      updateBugUI(bug);
      fetchAndDisplayDevelopers(bug.projectId);
    })
    .catch(function (error) {
      console.error("Error fetching bug details:", error);
      // Optionally update the UI to inform the user
    });
}

function updateBugUI(bug) {
  const bugNameElement = document.querySelector("#name");
  const saveStatusButton = document.querySelector("#saveStatus");
  const descriptionElement = document.querySelector("#text");
  const statusDropdown = document.querySelector("#status");
  const currentStatus = document.querySelector("#status-level");
  const reporterName = fetchUserName(bug.reportedBy);
  const assigneeName = fetchUserName(bug.assignedTo);
  const dateReportedElement = document.querySelector("#date");
  const stepsElement = document.querySelector("#steps");
  const deadlineElement = document.querySelector("#deadline");
  const priorityElement = document.querySelector("#priority");
  const severityElement = document.querySelector("#severity");

  bugNameElement.textContent = bug.name;
  descriptionElement.textContent = bug.description;
  setStatusDropdown(statusDropdown, bug.status);
  currentStatus.textContent = bug.status;
  reporterElement.textContent = bug.reportedBy;
  assigneeElement.textContent = bug.assignedTo;
  dateReportedElement.textContent = new Date(
    bug.reportTime
  ).toLocaleDateString();
  stepsElement.textContent = bug.stepsToReproduce;
  deadlineElement.textContent = new Date(bug.deadline).toLocaleDateString();
  priorityElement.textContent = bug.priority;
  severityElement.textContent = bug.severity;

  if (bug.resolvedTime) {
    const resolvedElement = document.querySelector("#resolved");
    resolvedElement.textContent = new Date(
      bug.resolvedTime
    ).toLocaleDateString();
  }

  saveStatusButton.addEventListener("click", function () {
    const selectedStatus = statusDropdown.value;
    updateBugStatus(bug._id, selectedStatus);
  });
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

async function updateBugStatus(bugId, newStatus) {
  const updatedData = {
    status: newStatus,
  };

  try {
    const response = await axiosInstance.patch(
      `/api/bugs/update/${bugId}`,
      updatedData
    );
    console.log("Status Updated: ", response.data);
    // Additional code to handle the response...
  } catch (error) {
    console.error("Error updating status: ", error);
    console.log(error.res.data);
    // Replace displayErrorMessage with an existing function or use alert/console.log
    alert("Failed to update status. Please try again."); // Example using alert
  }
}

function getBugIdFromURL() {
  const currentURL = new URL(window.location.href);
  const bugId = currentURL.pathname.split("/").pop();
  return bugId;
}

// Function to show the popup
function showPopup() {
  document.getElementById("developerPopup").classList.remove("hidden");
}

// Function to close the popup
function closePopup() {
  document.getElementById("developerPopup").classList.add("hidden");
}

document.getElementById("closePopup").addEventListener("click", function () {});

let selectedDeveloperId = null; // Variable to store the selected developer's ID
let selectedDeveloperName = null;

async function fetchAndDisplayDevelopers(projectId) {
  try {
    const response = await axiosInstance.get(`/api/projects/dev/${projectId}`);
    const developers = response.data;
    const developerListElement = document.getElementById("developerList");
    developerListElement.innerHTML = "";

    developers.forEach((developer) => {
      // Create radio button
      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.id = developer._id;
      radioInput.name = "developer";
      radioInput.value = developer._id;
      radioInput.classList.add("hidden", "peer");

      // Create label
      const developerLabel = document.createElement("label");
      developerLabel.setAttribute("for", developer._id);
      developerLabel.classList.add(
        "inline-flex",
        "items-center",
        "justify-between",
        "w-full",
        "h-full",
        "p-2",
        "text-gray-500",
        "bg-white",
        "border-2",
        "border-gray-200",
        "rounded-lg",
        "cursor-pointer",
        "hover:text-gray-600",
        "peer-checked:border-blue-600",
        "peer-checked:text-gray-600",
        "hover:bg-gray-50"
      );

      // Create content container
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("block");

      // Create name element
      const nameElement = document.createElement("div");
      nameElement.classList.add("w-full", "text-lg", "font-semibold");
      nameElement.textContent = developer.name;

      // Add elements to content container and label
      contentDiv.appendChild(nameElement);
      developerLabel.appendChild(contentDiv);
      const labelDiv = document.createElement("div");
      labelDiv.classList.add("w-full", "flex", "items-center", "h-full");
      labelDiv.appendChild(radioInput);
      labelDiv.appendChild(developerLabel);

      // Add event listener for radio selection
      radioInput.addEventListener("change", () => {
        selectedDeveloperId = developer._id;
        selectedDeveloperName = developer.name;
      });

      developerListElement.appendChild(labelDiv);
    });
  } catch (error) {
    console.error("Error fetching developers:", error);
  }

  document
    .getElementById("confirmAssign")
    .addEventListener("click", async () => {
      if (!selectedDeveloperId) {
        alert("Please select a developer first.");
        return;
      } else {
        assignDeveloper(selectedDeveloperId, selectedDeveloperName);
      }
    });

  async function assignDeveloper(developerId, developerName) {
    const bugId = getBugIdFromURL(); // Function to get the current bug ID
    try {
      const response = await axiosInstance.patch(`/api/bugs/update/${bugId}`, {
        assignedTo: developerId,
      });
      console.log("Developer assigned successfully!", response);
      // Update the UI to reflect the new assignment
      fetchAndDisplayDevelopers(bugId);
      closePopup();
      updateDevName(developerName);
    } catch (error) {
      console.error("Error assigning developer:", error);
      // Handle error
    }
  }
}

async function fetchUserName(userId) {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}`);
    return response.data.name; // Assuming the user object has a 'name' field
  } catch (error) {
    console.error("Error fetching user details:", error);
    return "Unknown"; // Fallback name
  }
}

function updateDevName(devName) {
  const assigneeElement = document.querySelector("#assignee-name");
  assigneeElement.textContent = devName;
}
