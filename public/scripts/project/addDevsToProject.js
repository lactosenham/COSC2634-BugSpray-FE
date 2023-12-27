// Function to fetch members
async function fetchmembers() {
    try {
        const res = await axios.get('api/projects/getAllDeveloper')
        const members = res.data;
        const devListElement = document.getElementById('devList');
        // Hide loading element and show content element
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('content').classList.remove('hidden');
        // Check for members data
        if (members.length === 0) {
            devListElement.innerHTML = '<p class="text-red-500">No members found.</p>';
            return;
        }
        // Initialize an empty array to store selected IDs
        const memberIds = [];
        // Pass members data to the partial template
        renderDeveloperList(devListElement, members, memberIds);

        // Handle form submission
        const addDevForm = document.getElementById('addDevForm');
        if (addDevForm) {
            addDevForm.addEventListener('submit', async (event) => {
                event.preventDefault(); 
                // Place holder project
                var projectId = extractIdFromUrl();
                var addDevData = {
                    projectId: projectId,
                    memberIds: memberIds
                }
                addSelectedMembers(addDevData);
                // Clear selected members list
                memberIds.length = 0;
                console.log('Currently selected: ' + memberIds);
            }
        )};
    } catch (error) {
        console.error('Error fetching members: ', error);
        document.getElementById('devList').innerHTML = '<p class="text-red-500">An error occurred while fetching members.</p>';
    }
}


// FUNCTION to add selected members
async function addSelectedMembers(addDevData) {
    await axiosInstance.post('/api/projects/add-member', addDevData, {
    })
    .then((response) => {
        console.log('members added successfully!', response);
    })
    .catch((error) => {
        console.error('Error adding members:', error.response.data);
    });
}


// FUNCTION to render developer list with checkboxes and event handling
function renderDeveloperList(element, members, memberIds) {
    // Clear existing element
    element.innerHTML = '';

    for (const developer of members) {
        const {_id, name, developerType} = developer;
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = _id;
        checkbox.name = 'id';
        checkbox.value = _id;
        checkbox.classList.add('hidden', 'peer');

        // Create label
        const label = document.createElement('label');
        label.setAttribute('for', _id);
        label.classList.add(
            'inline-flex',
            'items-center',
            'justify-between',
            'w-full',
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

        // Create name type elements
        const nameElement = document.createElement('div');
        nameElement.classList.add('w-full', 'text-lg', 'font-semibold');
        nameElement.textContent = name;

        // Create developer type element
        const developerTypeElement = document.createElement('div');
        developerTypeElement.classList.add('w-full', 'text-sm');
        developerTypeElement.textContent = `Developer Type: ${developerType ? developerType : 'N/A'}`;

        // Add elements to content container and label
        contentDiv.appendChild(nameElement);
        contentDiv.appendChild(developerTypeElement);
        label.appendChild(contentDiv);
        label.appendChild(checkbox);

        // Add event listener for checkbox selection
        checkbox.addEventListener('change', (event) => {
            const developerId = event.target.value;
            const isChecked = event.target.checked;

            // Update selected IDs array based on checkbox state
            if (isChecked) {
                memberIds.push(developerId);
            } else {
                const index = memberIds.indexOf(developerId);
                if (index > -1) {
                    memberIds.splice(index, 1);
                }
            }
            console.log(`Selected IDs: ${memberIds}`);
        });
        element.appendChild(label);
    }
}

// Trigger script on load
fetchmembers();

