import {
  AlbumByIdApiParameters,
  AlbumModelApiResponse,
  ArtistModelApiParameters,
  ArtistModelApiResponse,
  NewReleasesAPIResponseModel,
  NewReleasesMainAPIResponseModel,
  SongByIdApiParameters,
  SongByIdApiResponse,
  TopArtistAPIResponseModel,
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
    baseUrl: 'http://localhost:3000/api/',
    // baseUrl: 'https://music-api.pradityamanjhi.site/api/',
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

    getTopArtist: builder.query<z.infer<typeof TopArtistAPIResponseModel>, {}>({
      query: () => `top-artists`,
    }),

    getArtistById: builder.query<
      z.infer<typeof ArtistModelApiResponse>,
      ArtistModelApiParameters
    >({
      query: ({ artistId, page, songCount, albumCount, sortBy, sortOrder }) =>
        `artists?id=${artistId}`,
    }),

    getSongById: builder.query<
      z.infer<typeof SongByIdApiResponse>,
      SongByIdApiParameters
    >({ query: ({ songId }) => `songs/${songId}` }),

    getAlbumById: builder.query<
      z.infer<typeof AlbumModelApiResponse>,
      AlbumByIdApiParameters
    >({ query: ({ artistId }) => `albums?id=${artistId}` }),
  }),
});

export const {
  useGetNewReleasesQuery,
  useGetTopArtistQuery,
  useGetSongByIdQuery,
  useGetAlbumByIdQuery,
  useGetArtistByIdQuery,
} = mainApi;
