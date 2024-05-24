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
} from '@/types';
import { mainApi } from './main';
import { z } from 'zod';

const searchApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    searchByName: builder.query<z.infer<typeof SearchModelApiResponse>, SearchModelApiParameters>({
      query: ({ query }) => `/search${query ? `?query=${query}` : ''}`,
    }),

    searchSongByName: builder.query<
      z.infer<typeof SearchSongModelApiResponse>,
      SearchSongModelApiParameters
    >({
      query: ({ query, limit, page }) =>
        `/search/songs${query ? `?query=${query}` : ''}${
          limit ? `&limit=${limit}` : ''
        }${page ? `&page=${page}` : ''}`,
    }),

    searchAlbumByName: builder.query<
      z.infer<typeof SearchAlbumModelApiResponse>,
      SearchAlbumModelApiParameters
    >({
      query: ({ query, limit, page }) =>
        `/search/albums${query ? `?query=${query}` : ''}${
          limit ? `&limit=${limit}` : ''
        }${page ? `&page=${page}` : ''}`,
    }),

    searchArtistByName: builder.query<
      z.infer<typeof SearchArtistModelApiResponse>,
      SearchArtistModelApiParameters
    >({
      query: ({ query, limit, page }) =>
        `/search/artists${query ? `?query=${query}` : ''}${
          limit ? `&limit=${limit}` : ''
        }${page ? `&page=${page}` : ''}`,
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
