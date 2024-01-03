document.addEventListener('DOMContentLoaded', function() {
    fetchBugsNum();
});

async function fetchBugsNum() {
    try {

        // Get total number of bugs
        const totalRes = await axios.get('/api/bugs/all');
        const total = totalRes.data;
        console.log('Total number of bugs: ', total.length);

        // Get total number of Open bugs
        var openBugsReq = {
            status: "Open"
        }
        const openRes = await axiosInstance.post('/api/bugs/sort', openBugsReq);
        const open = openRes.data;
        console.log('Number of Open bugs: ', open.length);

        // Get total number of Resolved bugs
        var resolvedBugsReq = {
            status: "Resolved"
        }
        const resolvedRes = await axiosInstance.post('api/bugs/sort', resolvedBugsReq);
        const resolved = resolvedRes.data;
        console.log('Number of Resolved bugs: ', resolved.length);

        // Render number of bugs according to status
        document.getElementById('totalBugsNum').innerText = total.length;
        document.getElementById('openBugsNum').innerText = open.length;
        document.getElementById('resolvedBugsNum').innerText = resolved.length;
    } catch(error) {
        console.error('Error fetching bugs numbers', error);
    }
}
