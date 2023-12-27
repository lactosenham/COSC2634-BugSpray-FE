// Load All Bugs for a Specific Project
document.addEventListener('DOMContentLoaded', function() {
    // Replace with the actual endpoint to fetch bugs
    axiosInstance.get('/api/bugs/all')
        .then(function (response) {
            const bugs = response.data; // Assuming the response data is an array of bugs
            const bugsGrid = document.querySelector('.bugs-grid'); // Replace with your actual grid container
            bugs.forEach(bug => {
                const bugCard = `
                <div class="h-auto w-full flex flex-col bg-white shadow-md rounded-lg p-6 overflow-hidden mb-4">
                  <div class="flex justify-between items-center mb-2">
                    <h2 class="text-xl font-bold text-gray-800 truncate">
                      Bug ID: ${bug._id}
                    </h2>
                    <span class="px-3 py-1 text-sm text-white bg-red-500 rounded-full">
                      Priority: ${bug.priority}
                    </span>
                  </div>
                  <p class="text-sm text-gray-600">
                    <strong>Description:</strong> ${bug.description || 'No description provided'}
                  </p>
                  <p class="text-sm text-gray-600">
                    <strong>Steps to Reproduce:</strong> ${bug.stepsToReproduce || 'Not provided'}
                  </p>
                  <div class="flex justify-between items-center mt-2">
                    <span class="text-sm text-gray-600">
                      Status: <span class="text-blue-500">${bug.status}</span>
                    </span>
                    <a href="/bug-details/${bug._id}" class="text-blue-500 hover:text-blue-700 cursor-pointer">
                      Details →
                    </a>
                  </div>
                  <div class="mt-2">
                    <strong>Comments:</strong>
                    <ul class="list-disc pl-5">
                      ${bug.comments.map(comment => `
                        <li class="text-sm text-gray-600">
                          ${comment.comment} - <em>${new Date(comment.date).toLocaleString()}</em>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                </div>
              `;
                bugsGrid.innerHTML += bugCard;
            });
        })
        .catch(function (error) {
            console.error('Error fetching bugs:', error);
            // Handle the error, e.g., show a message to the user
        });
});
