/** Simple Weather Widget */
class WeatherWidget {
    constructor(container, apiKey) {
        this.container = container;
        this.apiKey = apiKey;
        this.init();
    }
    async init() {
        this.container.innerHTML = '<p>Loading weather...</p>';
        try {
            const pos = await this.getPosition();
            const weather = await this.fetchWeather(pos.lat, pos.lon);
            this.render(weather);
        } catch (err) {
            this.container.innerHTML = '<p>Could not load weather data.</p>';
        }
    }
    getPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
    }
    async fetchWeather(lat, lon) {
        const resp = await fetch(
            \`https://api.openweathermap.org/data/2.5/weather?lat=\${lat}&lon=\${lon}&units=metric&appid=\${this.apiKey}\`
        );
        return resp.json();
    }
    render(data) {
        this.container.innerHTML = \`
            <div class="weather-card">
                <h3>\${data.name}</h3>
                <div class="temp">\${Math.round(data.main.temp)}°C</div>
                <div class="desc">\${data.weather[0].description}</div>
                <div class="details">
                    <span>Humidity: \${data.main.humidity}%</span>
                    <span>Wind: \${data.wind.speed} m/s</span>
                </div>
            </div>\`;
    }
}
