import { z } from 'zod';
import { SongModel } from '../songs/song.model';

export const ArtistSongModel = z.object({
  total: z.number(),
  songs: z.array(SongModel),
});

// export const TopArtistAPIResponseModelBase = z.object({
//   artistid: z.string(),
//   name: z.string(),
//   image: z.string(),
//   follower_count: z.number(),
//   perma_url: z.string(),
// });

export const TopArtistModelBase = z.object({
  artistid: z.string(),
  name: z.string(),
  image: z.string(),
  followerCount: z.number(),
  url: z.string(),
});

export const TopArtistModel = z.object({
  results: z.array(TopArtistModelBase),
});

export const TopArtistAPIResponseModel = z.object({
  data: TopArtistModel,
  success: z.boolean(),
});
