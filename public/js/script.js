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



const dataRadar = {
    labels: [
        "Reservation 1",
        "Reservation 2",
        "Reservation 3",
        "Reservation 4",
        "Reservation 5",
        "Reservation 6",
        "Reservation 7",
    ],
    datasets: [{
        label: "My First Dataset",
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: "rgba(255,105,180)",
        borderColor: "rgb(255,20,147)",
        pointBackgroundColor: "rgb(133, 105, 241)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(133, 105, 241)",
    },
    {
        label: "My Second Dataset",
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: "rgba(255,105,180)",
        borderColor: "rgb(0,191,255)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
    },
    ],
};

const configRadarChart = {
    type: "radar",
    data: dataRadar,
    options: {},
};

var chartBar = new Chart(
    document.getElementById("chartRadar"),
    configRadarChart
);