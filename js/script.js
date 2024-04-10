"use strict";

const ctx1 = document.getElementById("myChart1").getContext("2d");
const ctx2 = document.getElementById("myChart2").getContext("2d");
const ctx3 = document.getElementById("myChart3").getContext("2d");
const ctx4 = document.getElementById("myChart4").getContext("2d");

// Data for the bar chart
let data1 = {
    labels: ["A", "B", "C", "D", "E"],
    datasets: [{
        label: "kwH",
        data: [100, 80, 40, 65, 30],
        backgroundColor: [
            "rgb(30, 30, 200)",
            "rgb(0, 0, 255)",
            "rgb(120, 120, 150)",
            "rgb(70, 70, 70)",
            "rgb(200, 200, 20)"
        ],
        borderWidth: 0,
        offset: 5,
        hoverOffset: 60
    }]
};

// Data for the bubble chart
let data2 = {
    datasets: [{
        label: 'Bubble Chart',
        data: [
            { x: 10, y: 20, r: 10 },
            { x: 30, y: 40, r: 15 },
            { x: 50, y: 60, r: 20 },
            { x: 70, y: 80, r: 25 },
            { x: 90, y: 100, r: 30 }
        ],
        backgroundColor: 'rgb(255, 99, 132)'
    }]
};

// Data for the donut chart
let data3 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(153, 102, 255)'
        ]
    }]
};

let config1 = {
    type: "bar",
    data: data1,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

let config2 = {
    type: "bubble",
    data: data2,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

let config3 = {
    type: "doughnut",
    data: data3,
    options: {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
            }
        }
    }
};

function updateTimeAndDate() {
    const now = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZoneName: 'short'
    };
    document.getElementById('timeAndDate').textContent = now.toLocaleString('en-US', options);
}

updateTimeAndDate(); // Initial call
setInterval(updateTimeAndDate, 1000);

let myChart1 = new Chart(ctx1, config1);
let myChart2 = new Chart(ctx2, config2);
let myChart3 = new Chart(ctx3, config3);
