import { z } from 'zod';
import { SongModel } from '../songs/song.model';

// export const SearchSongAPIResponseModel = z.object({
//   total: z.number(),
//   start: z.number(),
//   results: z.array(SongAPIResponseModel),
// });

export const SearchSongModel = z.object({
  total: z.number(),
  start: z.number(),
  results: z.array(SongModel),
});
