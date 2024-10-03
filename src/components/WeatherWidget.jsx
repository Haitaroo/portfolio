import React, { useEffect, useState } from 'react';
import './WeatherWidget.css'; // Assurez-vous d'importer le fichier CSS

const WeatherWidget = () => {
  const [weather, setWeather] = useState({ temp: '', description: '', icon: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Saguenay,ca&units=metric&appid=${apiKey}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.main && data.weather) {
          const temp = Math.ceil(data.main.temp);
          const description = capitalizeFirstLetter(translateDescription(data.weather[0].description));
          const icon = data.weather[0].icon;
          setWeather({ temp, description, icon });
        } else {
          throw new Error('Invalid data structure');
        }
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setError('Échec de la récupération des données météorologiques');
      });
  }, []);

  const translateDescription = (description) => {
    const translations = {
      'clear sky': 'ciel dégagé',
      'few clouds': 'quelques nuages',
      'scattered clouds': 'nuages épars',
      'broken clouds': 'nuages fragmentés',
      'shower rain': 'pluie d\'averse',
      'rain': 'pluie',
      'thunderstorm': 'orage',
      'snow': 'neige',
      'mist': 'brume',
    };
    return translations[description] || description;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={`weather-widget ${error ? 'weather-error' : ''}`}>
      {error ? (
        <span>{error}</span>
      ) : (
        <div className="weather-info">
          {weather.icon && (
            <img 
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
              alt={weather.description} 
              className="weather-icon" 
            />
          )}
          <div className="weather-details">
            <span className="weather-temp">{weather.temp}°C</span>
            <span className="weather-description">{weather.description}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;