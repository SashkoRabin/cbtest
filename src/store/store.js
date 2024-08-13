import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../services/weather';
import citySlice from './citySlice'

const store = configureStore({
	reducer: {
		[weatherApi.reducerPath]: weatherApi.reducer,
		city: citySlice
	},
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export default store;
