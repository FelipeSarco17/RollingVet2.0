import React, { useEffect, useState } from 'react'
import { getClima } from '../utils/utils';
const Weather = () => {

    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getLocationAndWeather = async () => {
           try{
            const data = await getClima();
            const newData = {
                condition: data.current.condition,
                temp: data.current.temp_c,
                country: data.location.country,
                region: data.location.region,
                feelsLike: data.current.feelslike_c,
                humidity: data.current.humidity,
            }
            setWeatherData(newData);
           }catch(err){
                setError(err.message);
           }
            
        }
        getLocationAndWeather();

    }, [])

    if (error) {
        return (
          <div className="bg-red-100 text-red-700 p-4 rounded-md text-center">
            Error: {error}
          </div>
        );
      }
    
      if (!weatherData) {
        return (
          <div className="bg-gray-100 text-gray-600 p-4 rounded-md text-center">
            Loading...
          </div>
        );
      }
    
      const { name, main, weather } = weatherData;
    
      return (
        <div className="max-w-sm mx-auto p-6 bg-gray-700 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-white">{weatherData.region}, {weatherData.country}</h2>
          <div className="flex flex-col items-center mt-4">
            <img
              src={weatherData.condition.icon}
              alt="weatherIcon"
              className="w-16 h-16"
            />
            <p className="text-4xl font-bold text-orange-500 mt-2">
              {Math.round(weatherData.temp)}°C
            </p>
            <p className="text-white capitalize mt-1">{weatherData.condition.text}</p>
          </div>
        </div>
      );
    
}

export default Weather

