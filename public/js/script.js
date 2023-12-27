// Hamburger navbar function
const mobileMenu = document.querySelector("#navBarButton");
const mobileMenuContainer = document.querySelector("#mobile-menu-2");
mobileMenu.addEventListener("click", () => {
    mobileMenuContainer.classList.toggle("hidden");
});

// Search bar function
document.addEventListener('DOMContentLoaded', (event) => {
    const searchBtn = document.getElementById('searchBtn');
    const searchBar = document.getElementById('searchBar');
    const closeSearchBtn = document.getElementById('closeSearchBtn');
    const form = document.querySelector('form');
    const searchInput = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => {
        // display search bar with animation
        if (searchBar.classList.contains('hidden')) {
            searchBar.classList.remove('hidden');
            searchBar.classList.remove('opacity-0');
            searchBar.classList.add('opacity-100');
        } else {
            // hide search bar with animation
            searchBar.classList.remove('opacity-100');
            searchBar.classList.add('opacity-0');
            setTimeout(() => searchBar.classList.add('hidden'), 300);
        }
    });

    closeSearchBtn.addEventListener('click', () => {
        searchBar.classList.remove('opacity-100');
        searchBar.classList.add('opacity-0');
        setTimeout(() => searchBar.classList.add('hidden'), 300);
    });

    // form.addEventListener('submit', (event) => {
    //     event.preventDefault();
    //     const query = searchInput.value;
    //     const data = { searchQuery: query };
    //     console.log(JSON.stringify(data));
    // });
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