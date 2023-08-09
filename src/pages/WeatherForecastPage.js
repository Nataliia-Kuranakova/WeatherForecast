import { useState } from 'react';
import InputSearch from '../components/InputSearch';
import CitiesList from '../components/CitiesList';
import ForecastList from '../components/ForecastList';

const WeatherForecastPage = ({ onFetchWeather, data, error, isLoading }) => {
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleCahnge = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div className="cities-list">
      <h1 className="main-title">
        Weather <span>Forecast</span>
      </h1>
      <InputSearch onChange={handleCahnge} searchTerm={searchTerm} />
      <CitiesList onFetchWeather={onFetchWeather} searchTerm={searchTerm} />
      <ForecastList data={data} error={error} isLoading={isLoading} />
    </div>
  );
};

export default WeatherForecastPage;
