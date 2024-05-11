import {
  NewReleasesAPIResponseModel,
  NewReleasesMainAPIResponseModel,
} from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';

interface NewReleases {
  language: string;
  limit: number;
  page: number;
}

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://music-api.pradityamanjhi.site/api/',
  }),
  endpoints: (builder) => ({
    getNewReleases: builder.query<
      z.infer<typeof NewReleasesAPIResponseModel>,
      NewReleases
    >({
      query: ({ language, page, limit }) =>
        `newReleases?language=${language}&page=${page}&limit=${limit}`,

      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const { language } = queryArgs;
        return language;
      },

      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, args) => {
        currentCache.lastPage = newItems.lastPage;
        if (currentCache.result && newItems.result) {
          currentCache.result.push(...newItems.result);
        }
      },

      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg, endpointState }) {
        return currentArg !== previousArg;
      },
      transformResponse(
        response: z.infer<typeof NewReleasesMainAPIResponseModel>
      ) {
        NewReleasesMainAPIResponseModel.parse(response);
        return response.data;
      },
    }),

    getTopArtist: builder.query({ query: () => `top-artists` }),

    getSongById: builder.query({ query: (id) => `albums/&id=${id}` }),

    getAlbumById: builder.query({ query: (id) => `albums?id=${id}` }),
  }),
});

export const {
  useGetNewReleasesQuery,
  useGetTopArtistQuery,
  useGetSongByIdQuery,
  useGetAlbumByIdQuery,
} = mainApi;
