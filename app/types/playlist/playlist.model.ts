import { z } from 'zod';
import { DownloadLinkModel } from '../common/download.model';
import { SongModel } from '../songs/song.model';
import { ArtistMapModel } from '../artist/artist-map.model';

export const PlaylistModel = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  year: z.number().nullable(),
  type: z.string(),
  playCount: z.number().nullable(),
  language: z.string(),
  explicitContent: z.boolean(),
  songCount: z.number().nullable(),
  url: z.string(),
  image: z.array(DownloadLinkModel),
  songs: z.array(SongModel).nullable(),
  artists: z.array(ArtistMapModel).nullable(),
});

export const TopPlaylistModelItem = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  type: z.string(),
  image: z.string(),
  url: z.string().url(),
  explicitContent: z.boolean(),
  songCount: z.number().nullable(),
  firstname: z.string(),
  followerCount: z.number().nullable(),
  lastUpdated: z.number().nullable(),
  uid: z.string(),
});

export const TopPlaylistModel = z.object({
  count: z.number(),
  lastPage: z.boolean(),
  result: z.array(TopPlaylistModelItem),
});

export const TopPlaylistAPIResponseModelSingleItem = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string(),
  type: z.string(),
  image: z.string(),
  perma_url: z.string(),
  more_info: z.object({
    song_count: z.string(),
    firstname: z.string(),
    follower_count: z.string(),
    last_updated: z.string(),
    uid: z.string(),
  }),
  explicit_content: z.string(),
  mini_obj: z.boolean(),
});

export const TopPlaylistAPIResponseModel = z.object({
  data: z.array(TopPlaylistAPIResponseModelSingleItem),
  count: z.number(),
  last_page: z.boolean(),
});
