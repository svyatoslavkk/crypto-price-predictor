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
      query: () => 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true',
    }),
    getBitcoinInfo: builder.query({
      query: (bitcoinId: string) => `coins/${bitcoinId}`,
    }),
  }),
});

export const { useGetCoinListQuery, useGetBitcoinInfoQuery } = api;
