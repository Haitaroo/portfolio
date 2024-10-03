import React, { useEffect, useState } from 'react';

const WeatherWidget = () => {
  const [weather, setWeather] = useState({ temp: '', description: '', icon: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace with your own API key and URL
    const apiKey = '16ea183604a4863fdf2569dc7572fea3';
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
          const temp = Math.ceil(data.main.temp); // Round up to the nearest integer
          const description = translateDescription(data.weather[0].description); // Translate description
          const icon = data.weather[0].icon; // Get the icon code
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
    return translations[description] || description; // Return the translation or the original description if not found
  };

  return (
    <div className={`weather-widget ${error ? 'weather-error' : ''}`}>
      {weather.icon && !error && (
        <img 
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
          alt={weather.description} 
          className="weather-icon" 
        />
      )}
      {error ? (
        <span>{error}</span>
      ) : (
        <>
          <span>{weather.temp}°C</span>
          <span>{weather.description}</span>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;