"use strict";

const ctx1 = document.getElementById("myChart1").getContext("2d");
const ctx2 = document.getElementById("myChart2").getContext("2d");
const ctx3 = document.getElementById("myChart3").getContext("2d");
const ctx8 = document.getElementById("myChart8").getContext("2d"); 

const weatherInfo = document.getElementById('weather-info');
const weatherCard = document.querySelector('.weather-card');

const lampToggle = document.getElementById('lamp-toggle');

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

let outdoorTemperatureData = []; 

let data8 = {
    labels: ["1", "2", "3", "4", "5"], 
    datasets: [{
        label: "Buitentemperatuur Amsterdam",
        data: outdoorTemperatureData, 
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1
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

let config8 = {
    type: "line",
    data: data8,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
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

updateTimeAndDate();
setInterval(updateTimeAndDate, 1000);

let myChart1 = new Chart(ctx1, config1);
let myChart2 = new Chart(ctx2, config2);
let myChart3 = new Chart(ctx3, config3);
let myChart8 = new Chart(ctx8, config8); 

fetch('https://api.openweathermap.org/data/2.5/weather?lat=52.3676&lon=4.9041&appid=b79ca570c5eecd5e7c798e57e2c7acb5')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const temperature = Math.round(data.main.temp - 273.15);
        outdoorTemperatureData.push(temperature); 
        const description = data.weather[0].description;
        weatherInfo.innerHTML = `
            <p>Temperature: ${temperature}°C</p>
            <p>Description: ${description}</p>
        `;
        
        myChart8.data.datasets[0].data = outdoorTemperatureData;
        myChart8.update();
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p>Error fetching weather data</p>`;
    });


fetch('https://api.sunrise-sunset.org/json?lat=52.3676&lng=4.9041&formatted=0')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const sunriseTime = new Date(data.results.sunrise);
        const sunsetTime = new Date(data.results.sunset);
        document.getElementById('sunrise').textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
        document.getElementById('sunset').textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;
    })
    .catch(error => {
        console.error('Error fetching sunrise and sunset data:', error);
        document.getElementById('sunrise').textContent = 'Error fetching sunrise data';
        document.getElementById('sunset').textContent = 'Error fetching sunset data';
    });


let lampOn = false;
lampToggle.addEventListener('click', () => {
    lampOn = !lampOn;
    if (lampOn) {
        lampToggle.src = "img/lampje aan.png";
    } else {
        lampToggle.src = 'img/lampje uit.png';
    }
});

let arduinoTemperatureData = []; 

let data9 = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [{
        label: "Arduino Temperature",
        data: arduinoTemperatureData, 
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
    }]
};

let config9 = {
    type: "line",
    data: data9,
    options: {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
};

let myChart9 = new Chart(document.getElementById('myChart9').getContext('2d'), config9);

function fetchArduinoTemperature() {
    fetch('url_to_your_arduino_data_endpoint') // vervang 'url_to_your_arduino_data_endpoint' met url
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const temperature = data.temperature;
            arduinoTemperatureData.push(temperature);
            
            myChart9.data.datasets[0].data = arduinoTemperatureData;
            myChart9.update();

            document.getElementById('arduino-temperature').textContent = `Temperature: ${temperature}°C`;
        })
        .catch(error => {
            console.error('Error fetching Arduino temperature data:', error);
            document.getElementById('arduino-temperature').textContent = 'Error fetching temperature data';
        });
}

fetchArduinoTemperature(); 

setInterval(fetchArduinoTemperature, 60000); 
