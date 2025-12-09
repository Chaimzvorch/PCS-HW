import React, { Component } from 'react';
import WeatherDisplay from './WeatherDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zip: "11219",     // Hard-coded zip code
      weather: null,    // Weather data after fetch
      error: null
    };
  }

  async componentDidMount() {
    const apiKey = "YOUR_API_KEY_HERE"; // <-- Put your weather API key here

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip}&appid=${apiKey}&units=imperial`
      );

      if (!response.ok) throw new Error("Weather fetch failed.");

      const data = await response.json();

      this.setState({ weather: data });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { zip, weather, error } = this.state;

    return (
      <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
        <h1>Weather App (React Class Version)</h1>

        <p><strong>Showing weather for ZIP:</strong> {zip}</p>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {/* Prevents crash by checking weather before rendering child */}
        {weather ? (
          <WeatherDisplay weather={weather} />
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    );
  }
}

export default App;