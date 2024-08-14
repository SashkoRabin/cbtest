import { createSlice } from '@reduxjs/toolkit';

export const citySlice = createSlice({
	name: 'city',
	initialState: [],
	reducers: {
		addCity: (state, action) => {
			state.push({ ...action.payload });
		},
		removeCity: (state, action) => {
			state = state.filter((item) => item.name !== action.payload)
		}
	}
});

export const { addCity, removeCity } = citySlice.actions;
export default citySlice.reducer;