import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_API_URL, API_KEY } from '../constants/general';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL }),
  endpoints: (builder) => ({
    addCountry: builder.query({
      query: (name) => `/geo/1.0/direct?q=${name}&limit=1&appid=${API_KEY}`,
    }),
  }),
})

export const { useAddCountryQuery } = weatherApi;