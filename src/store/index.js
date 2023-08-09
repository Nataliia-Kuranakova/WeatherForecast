import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { weatherForecastApi } from './apis/weatherForecastApi';

export const store = configureStore({
  reducer: {
    [weatherForecastApi.reducerPath]: weatherForecastApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(weatherForecastApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  useFetchWeatherQuery,
  useLazyFetchWeatherQuery,
  useFetchCurrentWeatherQuery,
  useLazyFetchCurrentWeatherQuery,
} from './apis/weatherForecastApi';
