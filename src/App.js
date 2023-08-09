import { useState } from 'react';
import {
  useLazyFetchWeatherQuery,
  useLazyFetchCurrentWeatherQuery,
} from './store';

import WeatherForecastPage from './pages/WeatherForecastPage';
import CurrentWeather from './components/CurrentWeather';

import '../src/styles/main.scss';

const App = () => {
  const [startTripData, setStartTripDate] = useState(null);
  const [
    fetchWeather,
    { data: weatherData, error: weatherError, isLoading: weatherIsLoading },
  ] = useLazyFetchWeatherQuery();
  const [
    fetchCurrentWeather,
    {
      data: currentWeatherData,
      error: currentWeatherError,
      isLoading: currentWeatherisLoading,
    },
  ] = useLazyFetchCurrentWeatherQuery();

  const handleFetchWeather = (trip) => {
    fetchWeather(trip);
    fetchCurrentWeather(trip);
    setStartTripDate(trip.start);
  };

  return (
    <div className="container">
      <main className="main-container">
        <WeatherForecastPage
          onFetchWeather={handleFetchWeather}
          data={weatherData}
          error={weatherError}
          isLoading={weatherIsLoading}
        />
        <CurrentWeather
          data={currentWeatherData}
          error={currentWeatherError}
          isLoading={currentWeatherisLoading}
          startTripData={startTripData}
          dataWeather={weatherData}
        />
      </main>
    </div>
  );
};

export default App;
