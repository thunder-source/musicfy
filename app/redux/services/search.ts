import {
  SearchAlbumModelApiParameters,
  SearchAlbumModelApiResponse,
  SearchArtistModelApiParameters,
  SearchArtistModelApiResponse,
  SearchModelApiParameters,
  SearchModelApiResponse,
  SearchPlaylistModelApiParameters,
  SearchPlaylistModelApiResponse,
  SearchSongModelApiParameters,
  SearchSongModelApiResponse,
  SearchSongModelApiRedux,
  SearchModelTypes,
  SearchAlbumModel,
  SearchArtistModel,
} from '@/types';
import { mainApi } from './main';
import { z } from 'zod';

const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    searchByName: builder.query<SearchModelTypes, SearchModelApiParameters>({
      query: ({ query }) => `/search${query ? `?query=${query}` : ''}`,

      transformResponse(response: z.infer<typeof SearchModelApiResponse>) {
        SearchModelApiResponse.parse(response);
        return { ...response.data };
      },
    }),

    searchSongByName: builder.query<
      z.infer<typeof SearchSongModelApiRedux>,
      SearchSongModelApiParameters
    >({
      query: ({ query, limit, page }) =>
        `/search/songs?query=${query}${limit ? `&limit=${limit}` : ''}${page ? `&page=${page}` : ''}`,

      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.query;
      },

      merge: (currentCache, newItems) => {
        if (!currentCache.results) {
          currentCache.results = [];
        }
        if (currentCache.results && newItems.results) {
          currentCache.results.push(...newItems.results);
        }
        currentCache.total = newItems.total;
        currentCache.start = newItems.start;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.query !== previousArg?.query || currentArg?.page !== previousArg?.page;
      },

      transformResponse(response: z.infer<typeof SearchSongModelApiResponse>) {
        return { ...response.data };
      },
    }),

    searchAlbumByName: builder.query<
      z.infer<typeof SearchAlbumModel>,
      SearchAlbumModelApiParameters
    >({
      query: ({ query, limit, page }) =>
        `/search/albums${query ? `?query=${query}` : ''}${
          limit ? `&limit=${limit}` : ''
        }${page ? `&page=${page}` : ''}`,

      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.query;
      },

      merge: (currentCache, newItems) => {
        if (!currentCache.results) {
          currentCache.results = [];
        }
        if (currentCache.results && newItems.results) {
          currentCache.results.push(...newItems.results);
        }
        currentCache.total = newItems.total;
        currentCache.start = newItems.start;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.query !== previousArg?.query || currentArg?.page !== previousArg?.page;
      },

      transformResponse(response: z.infer<typeof SearchAlbumModelApiResponse>) {
        return { ...response.data };
      },
    }),

    searchArtistByName: builder.query<
      z.infer<typeof SearchArtistModel>,
      SearchArtistModelApiParameters
    >({
      query: ({ query, limit, page }) =>
        `/search/artists${query ? `?query=${query}` : ''}${
          limit ? `&limit=${limit}` : ''
        }${page ? `&page=${page}` : ''}`,

      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.query;
      },

      merge: (currentCache, newItems) => {
        if (!currentCache.results) {
          currentCache.results = [];
        }
        if (currentCache.results && newItems.results) {
          currentCache.results.push(...newItems.results);
        }
        currentCache.total = newItems.total;
        currentCache.start = newItems.start;
      },

      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.query !== previousArg?.query || currentArg?.page !== previousArg?.page;
      },

      transformResponse(response: z.infer<typeof SearchArtistModelApiResponse>) {
        return { ...response.data };
      },
    }),

    searchPlaylistByName: builder.query<
      z.infer<typeof SearchPlaylistModelApiResponse>,
      SearchPlaylistModelApiParameters
    >({
      query: ({ query, limit, page }) =>
        `/search/playlists${query ? `?query=${query}` : ''}${
          limit ? `&limit=${limit}` : ''
        }${page ? `&page=${page}` : ''}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useSearchByNameQuery,
  useSearchSongByNameQuery,
  useSearchAlbumByNameQuery,
  useSearchArtistByNameQuery,
  useSearchPlaylistByNameQuery,
} = searchApi;
