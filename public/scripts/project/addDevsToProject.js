// Function to fetch members
async function fetchmembers() {
    try {
        // Get current project's ID
        const projectId = extractIdFromUrl();

        // Load Member list
        const allRes = await axios.get('api/projects/getAllDeveloper') // All members 
        const currentRes = await axiosInstance.get(`api/projects/dev/${projectId}`) // Only members in this project

        let allMembers = allRes.data;
        const currentMembers = currentRes.data;

        // Filter out members already in the project
        allMembers = allMembers.filter(member => !currentMembers.some(currMember => currMember._id === member._id));

        const allMemListElement = document.getElementById('allMemList');
        const currentMemListElement = document.getElementById('currentMemList');

        // Hide loading element and show content element
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('allContent').classList.remove('hidden');
        document.getElementById('currentContent').classList.remove('hidden');

        // Initialize an empty array to store selected IDs
        const memberIds = [];

        // Check for members data
        if (allMembers.length === 0) {
            allMemListElement.innerHTML = '<p class="text-red-500">No members found.</p>';
        } else {
            renderMemberList(allMemListElement, allMembers, memberIds);
        }

        if (currentMembers.length === 0) {
            currentMemListElement.innerHTML = '<p class="text-red-500">No members found.</p>';
            document.getElementById('Remove').classList.add('hidden');
        } else {
            renderMemberList(currentMemListElement, currentMembers, memberIds);
        }

        // Handle add member form submission
        const removeMemberForm = document.getElementById('removeMemberForm');
        const addMemberForm = document.getElementById('addMemberForm');
        if (addMemberForm) {
            addMemberForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                var addMemberData = {
                    projectId: projectId,
                    memberIds: memberIds
                }
                addSelectedMembers(addMemberData);
                // Clear selected members list
                console.log('Currently selected: ' + memberIds);
                memberIds.length = 0;
            }
            )
        };

        // Handle remove form submission
        if (removeMemberForm) {
            removeMemberForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                var removeMemberData = {
                    projectId: projectId,
                    memberIds: memberIds
                }
                removeSelectedMembers(removeMemberData);
                // Clear selected members list
                console.log('Removing members:' + memberIds);
                memberIds.length = 0;
            })
        };
    } catch (error) {
        console.error('Error fetching members: ', error);
        document.getElementById('allMemList').innerHTML = '<p class="text-red-500">An error occurred while fetching members.</p>';
        document.getElementById('currentMemList').innerHTML = '<p class="text-red-500">An error occurred while fetching members.</p>';
    }
}


// FUNCTION to add selected members
async function addSelectedMembers(addMemberData) {
    try {
        const response = await axiosInstance.post('/api/projects/add-member', addMemberData);
        console.log('Members added successfully!', response);

        // Close the modal with 'developerProject-modal' as the ID
        closeModal('developerProject-modalAdd Member');

        // Show the popup with a callback to reload the current page
        showPopup('Adding Member', 'Members Added Successfully', function () {
            fetchAndDisplayDevelopers(addMemberData.projectId);
            fetchmembers();
        });
    } catch (error) {
        console.error('Error adding members:', error.response.data);
    }
}


// FUNCTION to remove selected members
async function removeSelectedMembers(removeMemberData) {
    try {
        const response = await axiosInstance.post('/api/projects/remove-member', removeMemberData);
        console.log('Members removed successfully!', response);

        // Close the modal with 'developerProject-modal' as the ID
        closeModal('developerProject-modalRemove Member');

        // Show the popup with a callback to reload the current page
        showPopup('Removing Member From Project', 'Members Removed Successfully', function () {
            fetchAndDisplayDevelopers(removeMemberData.projectId);
            fetchmembers();
        });
    } catch (error) {
        console.error('Error removing members:', error.response.data);
    }
}


// FUNCTION to render developer list with checkboxes and event handling
function renderMemberList(element, members, memberIds) {
    // Clear existing element
    element.innerHTML = '';

    for (const developer of members) {
        const { _id, name, developerType } = developer;
        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = _id;
        checkbox.name = 'id';
        checkbox.value = _id;
        checkbox.classList.add('hidden', 'peer');

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
        memberLabel.appendChild(contentDiv);
        const labelDiv = document.createElement('div');
        labelDiv.classList.add('w-full', 'flex', 'items-center', 'h-full');
        labelDiv.appendChild(checkbox);
        labelDiv.appendChild(memberLabel);


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
        element.appendChild(labelDiv);
    }
}

// Trigger script on load
document.addEventListener('DOMContentLoaded', function () {
    fetchmembers();
});


