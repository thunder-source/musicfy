import {
  AlbumByIdApiParameters,
  AlbumModelApiResponse,
  ArtistModelApiParameters,
  ArtistModelApiResponse,
  NewReleasesAPIResponseModel,
  NewReleasesMainAPIResponseModel,
  SongByIdApiParameters,
  SongByIdApiResponse,
  SongSuggestionByIdApiParameters,
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
    baseUrl: 'https://music-api.pradityamanjhi.site/api/',
    // process.env.NODE_ENV == 'development'
    //   ? 'http://localhost:3000/api/'
    //   : 'https://music-api.pradityamanjhi.site/api/',
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

    getArtistById: builder.query<
      z.infer<typeof ArtistModelApiResponse>,
      ArtistModelApiParameters
    >({
      query: ({ artistId, page, songCount, albumCount, sortBy, sortOrder }) =>
        `artists?id=${artistId}${page ? `&page=${page}` : ''}${
          songCount ? `&songCount=${songCount}` : ''
        }${albumCount ? `&albumCount=${albumCount}` : ''}${
          sortBy ? `&sortBy=${sortBy}` : ''
        }${sortOrder ? `&sortOrder=${sortOrder}` : ''}`,

      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const { artistId } = queryArgs;
        return 'artists' + artistId;
      },

      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, args) => {
        if (args.arg.songCount === 100) {
          if (args.arg.page === 0) {
            return (currentCache = newItems);
          }
          if (newItems.data.topSongs?.length === 0) {
            currentCache.hasMoreTopSongs = false;
            return;
          }
          if (currentCache.data.topSongs && newItems.data.topSongs) {
            currentCache.hasMoreTopSongs = true;
            currentCache.data.topSongs.push(...newItems.data.topSongs);
            return;
          }
        }
        if (args.arg.albumCount === 50) {
          if (args.arg.page === 0) {
            return (currentCache = newItems);
          }
          if (newItems.data.topAlbums?.length === 0) {
            currentCache.hasMoreTopAlbums = false;
            return;
          }
          if (currentCache.data.topAlbums && newItems.data.topAlbums) {
            currentCache.hasMoreTopAlbums = true;
            currentCache.data.topAlbums.push(...newItems.data.topAlbums);
            return;
          }
        }
        // currentCache = newItems;
      },

      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg, endpointState }) {
        return currentArg !== previousArg;
      },
    }),

    getTopArtist: builder.query<z.infer<typeof TopArtistAPIResponseModel>, {}>({
      query: () => `top-artists`,
    }),

    getSongById: builder.query<
      z.infer<typeof SongByIdApiResponse>,
      SongByIdApiParameters
    >({
      query: ({ songId, lyrics }) =>
        `songs/${songId}${lyrics ? `?lyrics=${lyrics}` : ''}`,
    }),

    getAlbumById: builder.query<
      z.infer<typeof AlbumModelApiResponse>,
      AlbumByIdApiParameters
    >({ query: ({ albumId }) => `albums?id=${albumId}` }),

    getSongSuggestionById: builder.query<
      z.infer<typeof SongByIdApiResponse>,
      SongSuggestionByIdApiParameters
    >({
      query: ({ id, limit }) =>
        `songs/${id}/suggestions${limit ? `?limit=${limit}` : ''}`,
    }),
  }),
});

export const {
  useGetNewReleasesQuery,
  useGetTopArtistQuery,
  useGetSongByIdQuery,
  useGetAlbumByIdQuery,
  useGetArtistByIdQuery,
  useGetSongSuggestionByIdQuery,
} = mainApi;
