import { z } from 'zod';
import { SongModel } from '../songs/song.model';

export const SearchSongModel = z.object({
  total: z.number(),
  start: z.number(),
  results: z.array(SongModel),
});

export const SearchSongModelApiResponse = z.object({
  success: z.boolean(),
  data: SearchSongModel,
});

export const SearchSongModelApiRedux = z.object({
  total: z.number(),
  start: z.number(),
  results: z.array(SongModel),
});

export type SearchSongModelApiParameters = {
  query: string;
  page?: number;
  limit?: number;
};
