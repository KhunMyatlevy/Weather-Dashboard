const apiKey = '7917b0d41c33e563fd44ee1cc3e90926'; // OpenWeather API key

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    
    // Check if city input is empty
    if (city === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        // Handle possible API errors like city not found (404) or other issues
        if (response.status === 404) {
            document.getElementById('weatherInfo').innerHTML = `<p>City not found. Please try again.</p>`;
            return;
        }
        if (response.status === 401) {
            document.getElementById('weatherInfo').innerHTML = `<p>Invalid API key. Please check your API key.</p>`;
            return;
        }
        if (response.status !== 200) {
            document.getElementById('weatherInfo').innerHTML = `<p>Unable to fetch weather data. Error code: ${response.status}</p>`;
            return;
        }

        // Check if all required data is present before displaying
        if (data && data.sys && data.main && data.weather) {
            const weatherDetails = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weatherInfo').innerHTML = weatherDetails;
        } else {
            // If data is incomplete or missing, handle gracefully
            document.getElementById('weatherInfo').innerHTML = `<p>Incomplete data received. Please try again later.</p>`;
        }

    } catch (error) {
        // Catch network errors or issues with fetching data
        console.error('Error fetching the weather data:', error);
        document.getElementById('weatherInfo').innerHTML = `<p>Failed to fetch weather data. Please check your connection or try again later.</p>`;
    }
}
