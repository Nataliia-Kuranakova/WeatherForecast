import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
const apiKey = '89J5N27JG4SCH2NPDF8DL56EP';

const weatherForecastApi = createApi({
  reducerPath: 'weatherForecast',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
  }),
  endpoints(builder) {
    return {
      fetchWeather: builder.query({
        query: (trip) => {
          return {
            url: `/${trip.name}/${trip.start}/${trip.end}?unitGroup=metric&key=${apiKey}&contentType=json`,
            method: 'GET',
          };
        },
      }),
      fetchCurrentWeather: builder.query({
        query: (trip) => {
          return {
            url: `/${trip.name}/today?unitGroup=metric&key=${apiKey}&contentType=json`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchWeatherQuery,
  useLazyFetchWeatherQuery,
  useFetchCurrentWeatherQuery,
  useLazyFetchCurrentWeatherQuery,
} = weatherForecastApi;

export { weatherForecastApi };
