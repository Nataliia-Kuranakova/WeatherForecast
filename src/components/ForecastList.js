import { weekDay } from '../arrays/weekDaysArray';

const allIcons = require.context('../svg/weather-icons', true);
const iconsList = allIcons.keys().map((icon) => allIcons(icon));

const ForecastList = ({ data, error, isLoading }) => {
  
  const renderWeatherForecast = (arr) => {
    return arr.map((day) => {
      const days = new Date(day.datetime);

      const icon = iconsList.find((iconPath) => {
        let iconName = iconPath.split('/').pop().split('.')[0];
        return iconName === day.icon;
      });

      return (
        <div className="forecast" key={day.datetime}>
          <p>{weekDay[days.getDay()]}</p>
          <div>
            {day.icom}
            {icon && (
              <img
                className="forecact-list-icons"
                src={icon}
                alt={day.icon}
              ></img>
            )}
          </div>
          <div>
            <span>{Math.floor(day.tempmax)}&deg;</span>/
            <span>{Math.floor(day.tempmin)}&deg;</span>
          </div>
        </div>
      );
    });
  };

  let content;
  let loader;
  let errorMessage;
  if (isLoading) {
    loader = <div>Loading...</div>;
  } else if (data) {
    content = renderWeatherForecast(data.days);
  } else if (error) {
    errorMessage = <p>Error</p>;
  }

  return (
    <>
      {loader}
      {data && <h3 className="forecast-list-title">Trip forecast</h3>}
      <div className="forecast-list">{content}</div>
      {errorMessage}
    </>
  );
};

export default ForecastList;
