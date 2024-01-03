let isInitialized = false;

document.addEventListener('DOMContentLoaded', function () {
    if (!isInitialized) {
        // Set the flag to true to prevent future execution
        isInitialized = true;
        fetchRecentlySolvedBugs();
    }
});

function fetchRecentlySolvedBugs() {
    axiosInstance.get(`/api/bugs/solved`)
        .then(response => {
            const solvedBugs = response.data;
            const solvedBugsContainer = document.getElementById('recentlySolved'); 
            solvedBugsContainer.innerHTML = '';

            if (solvedBugs.length == 0) {
                solvedBugsContainer.innerHTML = '<p> No Recently Solved Bugs.</p>'
            }
            solvedBugs.forEach(bug => {
                solvedBugsContainer.innerHTML += createBugCard(bug);
            });
        })
        .catch(error => {
            console.error('Error fetching recently solved bugs:', error);
            solvedBugsContainer.innerHTML = '<p>Error loading bugs.</p>'
        });
}