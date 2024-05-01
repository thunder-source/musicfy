import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://music-api.pradityamanjhi.site/api/',
  }),
  //https://music-api.pradityamanjhi.site/api/newReleases?language=hindi&page=0&limit=10
  endpoints: (builder) => ({
    getNewReleases: builder.query({
      query: ({ language, page, limit }) =>
        `newReleases?language=${language}&page=${page}&limit=${limit}`,
      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const { language } = queryArgs;
        return language;
      },
      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, args) => {
        currentCache.data.lastPage = newItems.data.lastPage;
        currentCache.data.result.push(...newItems.data.result);
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg, endpointState }) {
        console.log(endpointState);
        return currentArg !== previousArg;
      },
    }),
    getTopArtist: builder.query({ query: () => `top-artists` }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/${artistId}`,
    }),
    getTopCharts: builder.query({ query: () => '/charts/world' }),

    getSongsByGenre: builder.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),
    getSongsByCountry: builder.query({
      query: (countryCode) => `/charts/country?country_code=${countryCode}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/api/search/songs?query=${searchTerm}`,
    }),

    getSongDetails: builder.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`,
    }),
  }),
});

export const {
  useGetNewReleasesQuery,
  useGetTopArtistQuery,
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = mainApi;
