import React, { useState, useEffect } from 'react';
import { fetchWeather } from './api/fetchWeather';
import { formatDate } from './helpers/dateFormater';
import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function fetchData(city) {
      const { data } = await fetchWeather(city);
      setWeather(data);
    }
    fetchData('Porto');
  }, []);

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
          <div className="grid-container">
            {weather.list.map((date, i) => {
              return(
                <div key={i} className="day-card">
                  <h4>{(new Date(weather.list[i].dt)).getDay}</h4>
                  <div className="day-temp">
                    {Math.round(weather.list[i].main.temp)}
                    <sup>&deg;C</sup>
                  </div>
                  <div className="info">
                    <img className="day-icon" src={`https://openweathermap.org/img/wn/${weather.list[i].weather[0].icon}@2x.png`} alt={weather.list[i].weather[0].description} />
                    <p>{weather.list[i].weather[0].description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <footer className="copyright">
        <p>Powered by <a href="https://openweathermap.org/">OpenWeather</a> and <a href="https://unsplash.com/">Unsplah.com</a></p>
      </footer>
    </div>
  );
}

export default App;