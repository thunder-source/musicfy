import {
  AlbumByIdApiParameters,
  AlbumModelApiResponse,
  ArtistAlbumModelApiParameters,
  ArtistAlbumModelApiResponse,
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
    baseUrl:
      process.env.NODE_ENV == 'development'
        ? 'http://localhost:3000/api/'
        : 'https://music-api.pradityamanjhi.site/api/',
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

    getArtistAlbumById: builder.query<
      z.infer<typeof ArtistAlbumModelApiResponse>,
      ArtistAlbumModelApiParameters
    >({
      query: ({ artistId, page, sortBy, sortOrder }) =>
        `artists/${artistId}/albums?page=${page}${
          sortBy ? `&sortBy=${sortBy}` : ''
        }${sortOrder ? `&sortOrder=${sortOrder}` : ''}`,

      serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
        const { artistId } = queryArgs;
        return 'artists' + artistId + 'albums';
      },

      // Always merge incoming data to the cache entry
      merge: (currentCache, newItems, args) => {
        if (currentCache.data.total && args.arg.page === 0) {
          currentCache.data.albums = [];
        }
        currentCache.data.lastPage = newItems.data.lastPage;
        if (currentCache.data.albums && newItems.data.albums) {
          currentCache.data.albums.push(...newItems.data.albums);
        }
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
  useGetArtistAlbumByIdQuery,
} = mainApi;
