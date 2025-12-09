import React, { Component } from 'react';

class WeatherDisplay extends Component {
  render() {
    const { weather } = this.props;

    return (
      <div style={{
        border: "1px solid #ccc",
        padding: "15px",
        width: "300px",
        borderRadius: "8px"
      }}>
        <h2>{weather.name}</h2>
        <p><strong>Temperature:</strong> {weather.main.temp}°F</p>
        <p><strong>Feels Like:</strong> {weather.main.feels_like}°F</p>
        <p><strong>Conditions:</strong> {weather.weather[0].description}</p>
      </div>
    );
  }
}

export default WeatherDisplay;