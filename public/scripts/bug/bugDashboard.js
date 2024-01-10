let allBugs = [];  // Store all bugs here
let assignedBugs = [];  // Store assigned bugs here
let currentDisplay = 'all';  // Track the current display state

document.addEventListener('DOMContentLoaded', function () {
    hideFrom('assigned', 'Manager');
    if (!isUserAuthenticated()) {
        // Redirect to login page if not authenticated
        window.location.href = '/login';
        return;
    }

    // Fetch and display bugs based on the initial state
    fetchBugs(currentDisplay);

    // Attach event listener to the sorting form
    const sortingForm = document.getElementById('sortingForm');
    if (sortingForm) {
        sortingForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent the default form submission
            const displayBugsOption = document.getElementById('displayBugs').value;
            const sortField = document.getElementById('sortField').value;
            const sortOrder = document.getElementById('sortOrder').value;
            // Validate user input
            if (sortField && !sortOrder) {
                event.preventDefault(); // Prevent form submission
                alert('Please choose an order for sorting.');
            }
            const status = document.getElementById('status').value;
            applySortingAndFiltering(displayBugsOption, sortField, sortOrder, status);
        });
    }
});

function clearForm() {
    // Reset the form fields to their default values
    document.getElementById('sortingForm').reset();
}

function isUserAuthenticated() {
    const token = localStorage.getItem('token'); // Adjust if you use a different key
    return !!token;
}

function applySortingAndFiltering(displayOption, sortField, sortOrder, status) {
    currentDisplay = displayOption;
    fetchBugs(displayOption, sortField, sortOrder, status);
}

function fetchBugs(displayOption = 'all', sortField, sortOrder, status) {
    const token = localStorage.getItem('token');
    let endpoint = '/api/bugs/all';  // Default endpoint for all bugs

    if (displayOption === 'assigned') {
        endpoint = '/api/bugs/mybugs';  // Endpoint for assigned bugs
    }

    axiosInstance.get(endpoint, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(function (response) {
            const bugs = response.data;

            if (displayOption === 'all') {
                allBugs = bugs;
            } else {
                assignedBugs = bugs;
            }
            filterAndSortBugs(sortField, sortOrder, status, displayOption);
        })
        .catch(function (error) {
            console.error('Error fetching bugs:', error);
            if (error.response && error.response.status === 401) {
                // Redirect to login if unauthorized
                window.location.href = '/login';
            }
        });
}

function filterAndSortBugs(sortField, sortOrder, status, displayOption) {
    let bugsToDisplay = displayOption === 'all' ? allBugs : assignedBugs;

    // Filter by status if provided
    if (status && status !== "all") {
        bugsToDisplay = bugsToDisplay.filter(bug => bug.status === status);
    }

    // Sort by the specified field and order
    if (sortField && sortOrder) {
        bugsToDisplay.sort((a, b) => {
            let fieldA = a[sortField];
            let fieldB = b[sortField];
            return sortOrder === 'asc' ? fieldA - fieldB : fieldB - fieldA;
        });
    }

    displayBugs(bugsToDisplay);
}

function displayBugs(bugs) {
    const bugGrid = document.querySelector('.bug-grid');
    bugGrid.innerHTML = ''; // Clear existing bugs

    if (bugs.length === 0) {
        // Display a centered message when no bugs meet the criteria
        bugGrid.innerHTML = `
        <div class="flex justify-center items-center h-full">
            <h2 class="text-2xl font-bold text-gray-800 text-center">No bugs meet your requirement(s).</h2>
        </div>`;
        return; // Exit the function early
    }

    bugs.forEach(bug => {
        const bugCard = `
        <div class="flex flex-col justify-between w-full gap-4 p-6 bg-white rounded-lg shadow-md h-full">
            <div class="flex justify-between w-full gap-2">
                <div class="flex flex-col gap-5">
                    <h2 class="block w-full text-2xl font-bold text-gray-800 line-clamp-1 text-ellipsis">
                        ${bug.name || 'Bug Title'}
                    </h2>
                    <p><strong>Status:</strong> ${bug.status}</p>
                    <p class="line-clamp-3 text-ellipsis"><strong>Description:</strong> ${bug.description || 'No description provided'}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <div class="px-3 py-2 text-sm font-semibold text-white bg-red-500 rounded-xl shadow-lg">
                    <p>Priority: ${bug.priority}</p>
                    </div>
                    <div class="px-3 py-2 text-sm font-semibold text-white bg-green-500 rounded-xl shadow-lg">
                    <p>Severity: ${bug.severity}</p>
                    </div>
                </div>
            </div>
            <div class="text-blue-500 cursor-pointer hover:text-blue-700">
                <a href="/bug-detail/${bug._id}">Details →</a>
            </div>
        </div>
        `;
        bugGrid.innerHTML += bugCard;
    });
}

