document.addEventListener('DOMContentLoaded', function() {
    const userRole = localStorage.getItem('role');
    if (userRole === "Manager") {
        fetchBugsNumManager();
    } else {
        fetchBugsNumDev();
    }
});

async function fetchBugsNumDev() {
    try {
        // Get total number of bugs
        const totalRes = await axiosInstance.get('/api/bugs/mybugs');
        const total = totalRes.data;
        console.log('Total number of bugs: ', total.length);

        // Extract identifiers from total
        const totalIds = new Set(total.map(bug => bug._id));

        // Filter function
        const filterBugs = (bug) => totalIds.has(bug._id);

        // Get total number of Open bugs
        var openBugsReq = {
            status: "Open"
        }
        const openRes = await axiosInstance.post('/api/bugs/sort', openBugsReq);
        const open = openRes.data.filter(filterBugs);
        console.log('Number of Open bugs: ', open.length);

        // Get total number of Resolved bugs
        var resolvedBugsReq = {
            status: "Resolved"
        }
        const resolvedRes = await axiosInstance.post('api/bugs/sort', resolvedBugsReq);
        const resolved = resolvedRes.data.filter(filterBugs);
        console.log('Number of Resolved bugs: ', resolved.length);

        // Render number of bugs according to status
        document.getElementById('totalBugsNum').innerText = total.length;
        document.getElementById('openBugsNum').innerText = open.length;
        document.getElementById('resolvedBugsNum').innerText = resolved.length;

    } catch(error) {
        console.error('Error fetching bugs numbers', error);
    }
}

async function fetchBugsNumManager() {
    try {

        // Get total number of bugs
        const totalRes = await axiosInstance.get('/api/bugs/totalbugs');
        const total = totalRes.data.totalBugsCount;
        console.log('Total number of bugs: ', total);

        // Get total number of Open bugs
        var openBugsReq = {
            status: "Open"
        }
        const openRes = await axiosInstance.get('/api/bugs/openbugs', openBugsReq);
        const open = openRes.data.openBugsCount;
        console.log('Number of Open bugs: ', open);

        // Get total number of Resolved bugs
        var resolvedBugsReq = {
            status: "Resolved"
        }
        const resolvedRes = await axiosInstance.get('api/bugs/solved', resolvedBugsReq);
        const resolved = resolvedRes.data;
        console.log('Number of Resolved bugs: ', resolved);

        // Render number of bugs according to status
        document.getElementById('totalBugsNum').innerText = total;
        document.getElementById('openBugsNum').innerText = open;
        document.getElementById('resolvedBugsNum').innerText = resolved.length;
    } catch(error) {
        console.error('Error fetching bugs numbers', error);
    }
}