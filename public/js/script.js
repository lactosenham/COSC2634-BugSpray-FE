document.getElementById('mobileMenuButton').addEventListener('click', function() {
    var mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
});


const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
    labels: labels,
    datasets: [{
        label: "My First dataset",
        backgroundColor: "hsl(252, 82.9%, 67.8%)",
        borderColor: "hsl(252, 82.9%, 67.8%)",
        data: [0, 10, 5, 2, 20, 30, 45],
    },],
};

const configLineChart = {
    type: "line",
    data,
    options: {},
};

var chartLine = new Chart(
    document.getElementById("chartLine"),
    configLineChart
);



const dataPie = {
    datasets: [{
        data: [2, 3, 5],
        backgroundColor: [
            'rgb(253, 140, 0)',
            'rgb(253, 197, 0)',
            'rgb(0, 172, 70)',
          ],
    }
    ],
    labels: ["High", "Medium", "Low"],
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
                text: 'Tickets by severity'
            },
            datalabels: {
                formatter: (value) => {
                    return value;
                },
            },
            doughnutabel: {
                labels: [
                    {
                        text: '10',
                        font: {
                            size:20,
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

var chartBar = new Chart(
    document.getElementById("chartPie"),
    configRadarChart
);