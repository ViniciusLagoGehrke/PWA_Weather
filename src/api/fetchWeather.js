import axios from 'axios';

const { REACT_APP_API_KEY } = process.env;

export const fetchWeather = async (query) => {  
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${query}&cnt=6&appid=${REACT_APP_API_KEY}&units=metric`);
  
  return response;
}