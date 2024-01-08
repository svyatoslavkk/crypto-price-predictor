import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => `everything?q=cryptocurrency&apiKey=6894eb23ee924fc4903667c1818434aa`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = newsApi;
