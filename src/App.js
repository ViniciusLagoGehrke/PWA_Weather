import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if(e.key === 'Enter'){
      const { data } = await fetchWeather(query)

      setWeather(data);
      setQuery('');
    }
  }

  return (
    <div className="main-container">

      <input
        type="text"
        className="search"
        placeholder="Search city"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />

      {weather.cod && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.city.name}</span>
            <sup>{weather.city.country}</sup>
          </h2>
          {weather.list.map((date, i) => {
            return(
              <div key={i}>
                <h4>{Date(weather.list[i].dt)}</h4>
                <div className="city-temp">
                  {Math.round(weather.list[i].main.temp)}
                  <sup>&deg;C</sup>
                </div>
                <div className="info">
                  <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}@2x.png`} alt={weather.list[i].weather[0].description} />
                  <p>{weather.list[i].weather[0].description}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <footer className="copyright">
        <p>Powered by <a href="https://www.metaweather.com/">MetaWeather.com</a> and <a href="https://unsplash.com/">Unsplah.com</a></p>
      </footer>
    </div>
  );
}

export default App;