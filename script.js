const apiKey = 'bcc1a4ae70024fea4cc2e13a98310cbb';
const url = `https://api.openweathermap.org/data/2.5/weather`;

document.getElementById('search-form').addEventListener('submit', event => {
    event.preventDefault();
    const cityInput = document.getElementById('city-input').value.trim();
    getWeather(cityInput);
});

function getWeather(city) {
    const fullUrl = `${url}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(fullUrl)
       .then(response => response.json())
       .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found. Please try again.');
            }
        })
       .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    const weatherData = data.weather[0];
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    const weatherHTML = `
        <div class="weather-card">
            <h2>Weather in ${data.name}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
            <img src="http://openweathermap.org/img/w/${weatherData.icon}.png" alt="Weather Icon">
        </div>
    `;

    document.getElementById('weather-data').innerHTML = weatherHTML;
}