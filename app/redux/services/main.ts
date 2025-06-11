import {
  AlbumByIdApiParameters,
  AlbumModelApiResponse,
  ArtistModelApiParameters,
  ArtistModelApiResponse,
  NewReleasesModelApiBase,
  NewReleasesApiParameters,
  NewReleasesApiResponseModel,
  SongByIdApiParameters,
  SongByIdApiResponse,
  SongSuggestionByIdApiParameters,
  TopArtistAPIResponseModel,
  TopArtistModelApiBase,
} from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { z } from 'zod';

export const mainApi = createApi({
  reducerPath: 'mainApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://music-api.pradityamanjhi.in/api/',
  }),

  endpoints: (builder) => ({
    getNewReleases: builder.query<
      z.infer<typeof NewReleasesModelApiBase>,
      NewReleasesApiParameters
    >({
      query: ({ language, page, limit }) =>
        `newReleases?language=${language}&page=${page}&limit=${limit}`,

      serializeQueryArgs: ({ queryArgs }) => queryArgs.language,

      merge: (currentCache, newItems) => {
        currentCache.lastPage = newItems.lastPage;
        if (currentCache.result) {
          currentCache.result.push(...newItems.result);
        } else {
          currentCache.result = newItems.result;
        }
      },

      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,

      transformResponse(response: z.infer<typeof NewReleasesApiResponseModel>) {
        // NewReleasesApiResponseModel.parse(response);
        return response.data;
      },
    }),

    getArtistById: builder.query<z.infer<typeof ArtistModelApiResponse>, ArtistModelApiParameters>({
      query: ({ artistId, page, songCount, albumCount, sortBy, sortOrder }) =>
        `artists?id=${artistId}${page ? `&page=${page}` : ''}${
          songCount ? `&songCount=${songCount}` : ''
        }${albumCount ? `&albumCount=${albumCount}` : ''}${
          sortBy ? `&sortBy=${sortBy}` : ''
        }${sortOrder ? `&sortOrder=${sortOrder}` : ''}`,

      serializeQueryArgs: ({ queryArgs }) => `artists${queryArgs.artistId}`,

      merge: (currentCache, newItems, { arg }) => {
        if (arg.songCount === 100) {
          if (arg.page === 0) {
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
        if (arg.albumCount === 50) {
          if (arg.page === 0) {
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
      },

      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,

      transformResponse: (response: z.infer<typeof ArtistModelApiResponse>) => {
        // ArtistModelApiResponse.parse(response);
        return response;
      },
    }),

    getTopArtist: builder.query<z.infer<typeof TopArtistModelApiBase>, {}>({
      query: () => `top-artists`,

      transformResponse: (response: z.infer<typeof TopArtistAPIResponseModel>) => {
        // TopArtistAPIResponseModel.parse(response);
        return response.data;
      },
    }),

    getSongById: builder.query<z.infer<typeof SongByIdApiResponse>, SongByIdApiParameters>({
      query: ({ songId, lyrics }) => `songs/${songId}${lyrics ? `?lyrics=${lyrics}` : ''}`,

      transformResponse: (response: z.infer<typeof SongByIdApiResponse>) => {
        // SongByIdApiResponse.parse(response);
        return response;
      },
    }),

    getAlbumById: builder.query<z.infer<typeof AlbumModelApiResponse>, AlbumByIdApiParameters>({
      query: ({ albumId }) => `albums?id=${albumId}`,
      transformResponse: (response: z.infer<typeof AlbumModelApiResponse>) => {
        // AlbumModelApiResponse.parse(response);
        return response;
      },
    }),

    getSongSuggestionById: builder.query<
      z.infer<typeof SongByIdApiResponse>,
      SongSuggestionByIdApiParameters
    >({
      query: ({ id, limit }) => `songs/${id}/suggestions${limit ? `?limit=${limit}` : ''}`,
      transformResponse: (response: z.infer<typeof SongByIdApiResponse>) => {
        // SongByIdApiResponse.parse(response);
        return response;
      },
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
