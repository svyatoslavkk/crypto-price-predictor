import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.coingecko.com/api/v3',
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCoinList: builder.query({
      query: () => 'coins/list',
    }),
    getBitcoinInfo: builder.query({
      query: (bitcoinId) => `coins/${bitcoinId}`,
    }),
  }),
});

export const { useGetCoinListQuery, useGetBitcoinInfoQuery } = api;
