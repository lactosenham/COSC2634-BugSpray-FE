// document.addEventListener('DOMContentLoaded', function() {
//     // Replace with the actual bug ID you want to fetch
//     const bugId = 'YOUR_BUG_ID_HERE';

//     axiosInstance.get(`/api/bugs/${bugId}`)
//         .then(function (response) {
//             const bug = response.data; // The bug data from the backend

//             // Querying the DOM for the elements where data will be inserted
//             const bugNameElement = document.querySelector('#name');
//             const descriptionElement = document.querySelector('#text');
//             const statusElement = document.querySelector('#status');
//             const reporterElement = document.querySelector('#reporter-name');
//             const assigneeElement = document.querySelector('#assignee-name');
//             const dateReportedElement = document.querySelector('#date');
//             const stepsElement = document.querySelector('#steps');
//             const deadlineElement = document.querySelector('#deadline');

//             // Inserting data into the elements
//             bugNameElement.textContent = bug.name;
//             descriptionElement.textContent = bug.description;
//             statusElement.value = bug.status;
//             reporterElement.textContent = bug.reportedBy; // Replace with reporter's name if available
//             assigneeElement.textContent = bug.assignedTo; // Replace with assignee's name if available
//             dateReportedElement.textContent = new Date(bug.reportTime).toLocaleDateString();
//             stepsElement.textContent = bug.stepsToReproduce;
//             deadlineElement.textContent = new Date(bug.deadline).toLocaleDateString();

//             // Handle the case when the bug is resolved
//             if (bug.resolvedTime) {
//                 const resolvedElement = document.querySelector('#resolved');
//                 resolvedElement.textContent = new Date(bug.resolvedTime).toLocaleDateString();
//             }
//         })
//         .catch(function (error) {
//             console.error('Error fetching bug details:', error);
//             // Handle the error, e.g., show a message to the user
//         });
// });
document.addEventListener('DOMContentLoaded', function() {
    const bugId = getBugIdFromURL();

    axiosInstance.get(`/api/bugs/${bugId}`)
        .then(function (response) {
            const bug = response.data;
            console.log(bug); // For debugging, remove in production

            const bugNameElement = document.querySelector('#name');
            const descriptionElement = document.querySelector('#text');
            const statusDropdown = document.querySelector('#status'); // Use this for dropdown
            const currentStatus = document.querySelector('#status-level');
            const reporterElement = document.querySelector('#reporter-name');
            const assigneeElement = document.querySelector('#assignee-name');
            const dateReportedElement = document.querySelector('#date');
            const stepsElement = document.querySelector('#steps');
            const deadlineElement = document.querySelector('#deadline');
            const priorityElement = document.querySelector('#priority');
            const severityElement = document.querySelector('#severity');

            bugNameElement.textContent = bug.name;
            descriptionElement.textContent = bug.description;
            setStatusDropdown(statusDropdown, bug.status); // Set the current status in the dropdown
            currentStatus.textContent = bug.status;
            console.log(bug.status)
            reporterElement.textContent = bug.reportedBy; // Replace with reporter's name if available
            assigneeElement.textContent = bug.assignedTo; // Replace with assignee's name if available
            dateReportedElement.textContent = new Date(bug.reportTime).toLocaleDateString();
            stepsElement.textContent = bug.stepsToReproduce;
            deadlineElement.textContent = new Date(bug.deadline).toLocaleDateString();
            priorityElement.textContent = bug.priority;
            severityElement.textContent = bug.severity;

            if (bug.resolvedTime) {
                const resolvedElement = document.querySelector('#resolved');
                resolvedElement.textContent = new Date(bug.resolvedTime).toLocaleDateString();
            }
        })
        .catch(function (error) {
            console.error('Error fetching bug details:', error);
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

function getBugIdFromURL() {
    const currentURL = new URL(window.location.href);
    const bugId = currentURL.pathname.split('/').pop();
    return bugId;
}
