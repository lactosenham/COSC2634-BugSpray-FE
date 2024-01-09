document.addEventListener("DOMContentLoaded", function () {
  const bugId = getBugIdFromURL();

  axiosInstance
    .get(`/api/bugs/${bugId}`)
    .then(function (response) {
      const bug = response.data;
      fetchAndDisplayDevelopers(bug.projectId);
      console.log(bug.projectId);
      const bugNameElement = document.querySelector("#name");
      const saveStatusButton = document.querySelector("#saveStatus");
      const descriptionElement = document.querySelector("#text");
      const statusDropdown = document.querySelector("#status"); // Use this for dropdown
      const currentStatus = document.querySelector("#status-level");
      const reporterElement = document.querySelector("#reporter-name");
      const assigneeElement = document.querySelector("#assignee-name");
      const dateReportedElement = document.querySelector("#date");
      const stepsElement = document.querySelector("#steps");
      const deadlineElement = document.querySelector("#deadline");
      const priorityElement = document.querySelector("#priority");
      const severityElement = document.querySelector("#severity");

      bugNameElement.textContent = bug.name;
      descriptionElement.textContent = bug.description;
      setStatusDropdown(statusDropdown, bug.status); // Set the current status in the dropdown
      currentStatus.textContent = bug.status;
      console.log(bug.status);
      reporterElement.textContent = bug.reportedBy; // Replace with reporter's name if available
      assigneeElement.textContent = bug.assignedTo; // Replace with assignee's name if available
      dateReportedElement.textContent = new Date(
        bug.reportTime
      ).toLocaleDateString();
      stepsElement.textContent = bug.stepsToReproduce;
      deadlineElement.textContent = new Date(bug.deadline).toLocaleDateString();
      priorityElement.textContent = bug.priority;
      severityElement.textContent = bug.severity;

      // Event listener for the save button
      saveStatusButton.addEventListener("click", function () {
        const selectedStatus = statusDropdown.value;
        const bugId = getBugIdFromURL(); // Assuming you have this function from your previous code
        updateBugStatus(bugId, selectedStatus);
      });

      if (bug.resolvedTime) {
        const resolvedElement = document.querySelector("#resolved");
        resolvedElement.textContent = new Date(
          bug.resolvedTime
        ).toLocaleDateString();
      }
    })
    .catch(function (error) {
      console.error("Error fetching bug details:", error);
      // Optionally update the UI to inform the user
    });
});

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
document.getElementById("closePopup").addEventListener("click", function () {
  document.getElementById("developerPopup").classList.add("hidden");
});

// Function to fetch and display developers in the popup
async function fetchAndDisplayDevelopers(projectId) {
  try {
    const response = await axiosInstance.get(`/api/projects/dev/${projectId}`); // Adjust the API endpoint as needed
    const developers = response.data;
    console.log(response.data);
    const developerListElement = document.getElementById("developerList");
    developerListElement.innerHTML = ""; // Clear existing list

    developers.forEach((developer) => {
      const developerItem = document.createElement("div");
      developerItem.className = "p-2 hover:bg-gray-100 cursor-pointer";
      developerItem.textContent = developer.name; // Adjust according to your developer object structure
      developerItem.onclick = () => assignDeveloper(developer._id); // Function to assign developer
      developerListElement.appendChild(developerItem);
    });
  } catch (error) {
    console.error("Error fetching developers:", error);
    // Handle error
  }
}

// Function to assign a developer to the bug
function assignDeveloper(developerId) {
  const bugId = getBugIdFromURL(); // Function to get the current bug ID
}

// Event listener to open the popup
document
  .getElementById("assignDeveloperButton")
  .addEventListener("click", showPopup);

// Add more functions as needed for assigning developers to the bug
