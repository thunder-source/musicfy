import { z } from 'zod';
import { SongModel } from '../songs/song.model';

export const ArtistSongModel = z.object({
  total: z.number(),
  songs: z.array(SongModel),
});

export const TopArtistModelBase = z.object({
  artistid: z.string(),
  name: z.string(),
  image: z.string(),
  followerCount: z.number(),
  url: z.string(),
});

export const TopArtistModelApiBase = z.object({
  results: z.array(TopArtistModelBase),
});

export const TopArtistAPIResponseModel = z.object({
  data: TopArtistModelApiBase,
  success: z.boolean(),
});
