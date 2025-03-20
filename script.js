Javascript 

const apiKey = "d92fcc34c4b01f6c3c4cbd9705969e10"; 
const searchButton = document.getElementById('searchButton');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const errorMessage = document.getElementById('errorMessage');

searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    } else {
        showError('Please enter a city name.');
    }
});

async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

function displayWeather(data) {
    const { main, weather } = data;
    const temperature = main.temp;
    const humidity = main.humidity;
    const description = weather[0].description;
    const icon = weather[0].icon;

    weatherResult.innerHTML = `
<h2>${data.name}</h2>
<img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}">
<p>Temperature: ${temperature} °C</p>
<p>Humidity: ${humidity} %</p>
<p>Description: ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    `;
    errorMessage.textContent = ''; 
}

function showError(message) {
    errorMessage.textContent = message;
    weatherResult.innerHTML = ''; 
}
