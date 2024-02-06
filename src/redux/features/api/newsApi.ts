import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const NEWS_API = import.meta.env.VITE_NEWS_API;

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
      query: () => `everything?q=cryptocurrency&apiKey=${NEWS_API}`,
    }),
  }),
});

export const { useGetCryptoNewsQuery } = newsApi;
