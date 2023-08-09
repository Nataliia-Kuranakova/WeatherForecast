import React from 'react';
import { weekDay } from '../arrays/weekDaysArray';

import CountdownTimer from './CountdownTimer';

const allIcons = require.context('../svg/weather-icons-mono', true);
const iconsList = allIcons.keys().map((icon) => allIcons(icon));

const CurrentWeather = ({ data, error, isLoading, startTripData }) => {
  const city = data ? data.address : 'City';

  const renderCurrentWeather = (arr) => {
    return arr.map((item) => {
      const currDay = new Date(item.datetime);
      const icon = iconsList.find((iconPath) => {
        let iconName = iconPath.split('/').pop().split('.')[0];
        return iconName === item.icon;
      });
      return (
        <React.Fragment key={item.datetime}>
          {data && (
            <h3 className="current-weather-title">
              {weekDay[currDay.getDay()]}
            </h3>
          )}
          <div className="current-weather-temp">
            {icon && (
              <div className="current-weather-temp-icon">
                <img src={icon} alt={item.icon}></img>
              </div>
            )}
            <div className="temp">
              {Math.floor(data.currentConditions.temp)}
              <sup className="degree">&deg;c</sup>
            </div>
          </div>
          <p className="current-weather-subtitle">{city}</p>
          <CountdownTimer startTripData={startTripData} />
        </React.Fragment>
      );
    });
  };

  let content = (
    <p className="current-weather-cover-title">
      Select a trip to discover the current weather conditions.
    </p>
  );
  let errorMessage;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (data) {
    content = renderCurrentWeather(data.days);
  } else if (error) {
    errorMessage = <div>Error</div>;
  }

  return (
    <section className="current-weather-container">
      {content}
      {errorMessage}
    </section>
  );
};

export default CurrentWeather;
