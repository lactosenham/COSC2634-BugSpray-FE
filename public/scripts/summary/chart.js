function getLastSixMonths() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const now = new Date();
    let months = [];

    for (let i = 5; i >= 0; i--) {
        let month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        months.push(monthNames[month.getMonth()]);
    }

    return months;
}

// Function to fetch data and update the chart
async function fetchDataAndUpdateChart() {
    try {
        // Fetch data from API
        const severityRes = await axiosInstance.get('/api/bugs/total-bugs-last-6-months');
        const bugsData = severityRes.data;

        // Get last 6 months for chart
        const labels = getLastSixMonths();

        // Create chart data object
        const data = {
            labels: labels,
            datasets: [{
                label: "Number of Bugs Reported",
                backgroundColor: "hsl(252, 82.9%, 67.8%)",
                borderColor: "hsl(252, 82.9%, 67.8%)",
                data: bugsData,
            }],
        };

        // Config for the chart
        const config = {
            type: 'line',
            data: data,
            options: {}
        };

        // Render the chart in the canvas with id 'chartLine'
        new Chart(
            document.getElementById('totalBugs'),
            config
        );
    } catch (error) {
        console.error('Error fetching chart data:', error);
        // Handle error (e.g., display an error message)
    }
}

// Fetch Data about the number of bugs by Priority and Severity
async function fetchBugsData() {
    try {
        const severityRes = await axiosInstance.get(`/api/bugs/bugs-chart/severity`);
        const priorityRes = await axiosInstance.get(`/api/bugs/bugs-chart/priority`);
        
        const severityData = severityRes.data;
        const priorityData = priorityRes.data;

        renderBugsChart(severityData, 'bugsBySeverity', 'Bugs by Severity');
        renderBugsChart(priorityData, 'bugsByPriority', 'Bugs by Priority')
        
    } catch (error) {
        console.error('Error fetching bug data:', error);
        return { severityData: [], priorityData: [] }; // Return empty arrays in case of an error
    }
}

const chartInstances = {};

// Render Chart
function renderBugsChart(bugData, elementId, title) {
    const ctx = document.getElementById(elementId).getContext('2d');
    const totalBugs = bugData.reduce((acc, curr) => acc + curr, 0); // Calculate total bugs

    const dataPie = {
        datasets: [{
            data: bugData,
            backgroundColor: [
                'rgb(120,0,0)',  // Severity 1 (most severe)
                'rgb(220,0,0)',  // Severity 2
                'rgb(253,140,0)',  // Severity 3
                'rgb(253,197,0)',  // Severity 4
                'rgb(0,172,70)'   // Severity 5 (least severe)
            ],
        }],
        labels: ["1", "2", "3", "4", "5"],
    };

    const configRadarChart = {
        type: 'doughnut',
        data: dataPie,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                },
                datalabels: {
                    formatter: (value) => value,
                },
                doughnutlabel: {
                    labels: [
                        {
                            text: totalBugs.toString(),
                            font: {
                                size: 20,
                                weight: 'bold',
                            },
                        },
                        {
                            text: 'total',
                        }
                    ],
                },
            },
        },
    };

    // Check if a chart instance already exists
    if (chartInstances[elementId]) {
        // Update the existing chart
        chartInstances[elementId].data = dataPie;
        chartInstances[elementId].options.plugins.doughnutlabel.labels[0].text = totalBugs.toString();
        chartInstances[elementId].update();
    } else {
        // Create a new chart instance
        chartInstances[elementId] = new Chart(ctx, configRadarChart);
    }
}


// Call the function to fetch data and update the chart
document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart();
    fetchBugsData();
});

