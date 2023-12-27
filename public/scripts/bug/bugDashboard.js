// Load All Bugs for the Logged In Manager
document.addEventListener('DOMContentLoaded', function() {
  axios.get('/api/bugs/all')  // Replace with your actual API endpoint
      .then(function (response) {
          const bugs = response.data; // Assuming the response data is an array of bugs
          const bugGrid = document.querySelector('.bug-grid'); // The container where bug cards will be inserted

          // Clear existing content
          bugGrid.innerHTML = '';

          // Create HTML for each bug and append to the container
          bugs.forEach(bug => {
              const bugCard = `
              <div class="flex flex-col justify-between w-auto gap-4 p-6 bg-white rounded-lg shadow-md h-70">
                  <div class="flex justify-between w-full gap-2">
                      <div class="flex flex-col gap-5">
                          <h2 class="block w-full text-2xl font-bold text-gray-800 line-clamp-1 text-ellipsis">
                              ${bug.name || 'Bug Title'}
                          </h2>
                          <p><strong>Status:</strong> ${bug.status}</p>
                          <p class="line-clamp-3 text-ellipsis"><strong>Description:</strong> ${bug.description || 'No description provided'}</p>
                          <p class="line-clamp-3 text-ellipsis"><strong>Steps to Reproduce:</strong> ${bug.stepsToReproduce || 'Not provided'}</p>
                      </div>
                      <div class="flex flex-col gap-2">
                          <div class="px-5 py-2 text-sm font-semibold text-white bg-red-500 rounded-full shadow-lg">
                              Priority: ${bug.priority}
                          </div>
                          <div class="inline-flex items-center px-5 py-2 text-sm font-semibold text-white bg-green-500 rounded-full shadow-lg">
                              Severity: ${bug.severity}
                          </div>
                      </div>
                  </div>
                  <div class="text-blue-500 cursor-pointer hover:text-blue-700">
                      <a href="/bugs/${bug._id}">Details →</a>
                  </div>
              </div>
              `;
              bugGrid.innerHTML += bugCard;
          });
      })
      .catch(function (error) {
          console.error('Error fetching bugs:', error);
          // Handle the error, e.g., show a message to the user
      });
});
