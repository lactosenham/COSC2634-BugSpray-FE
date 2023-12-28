// Load Logged In Manager's Project
document.addEventListener('DOMContentLoaded', function() {
    axiosInstance.get('/api/projects/my-projects')
        .then(function (response) {
            const projects = response.data; // Assuming the response data is an array of projects
            const cardsGrid = document.querySelector('.cards-grid');
            projects.forEach(project => {
                const projectCard = `
                <div class="h-52 w-full flex flex-col bg-white shadow-md rounded-lg p-6 overflow-hidden">
                  <div class="flex justify-between items-center mb-2">
                    <h2 class="text-2xl font-bold text-gray-800 truncate">
                      ${project.name}
                    </h2>
                  </div>
                  <p class="flex-1 text-sm text-gray-600 overflow-y-auto">
                    <strong>Description:</strong> ${project.description}
                  </p>
                  <div class="text-blue-500 hover:text-blue-700 cursor-pointer mt-2">
                    <a href="/project-details/${project._id}">Details →</a>
                  </div>
                </div>
              `;
                cardsGrid.innerHTML += projectCard;
            });
        })
        .catch(function (error) {
            console.error('Error fetching projects:', error);
            // Handle the error, e.g., show a message to the user
        });
});