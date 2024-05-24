import { z } from 'zod';
import { AlbumModel } from '../album/album.model';
import { SongModel } from '../songs/song.model';
import { DownloadLinkModel } from '../common/download.model';

export const ArtistModel = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  type: z.literal('artist'),
  image: z.array(DownloadLinkModel),
  followerCount: z.number().nullable(),
  fanCount: z.string().nullable(),
  isVerified: z.boolean().nullable(),
  dominantLanguage: z.string().nullable(),
  dominantType: z.string().nullable(),
  bio: z
    .array(
      z.object({
        text: z.string().nullable(),
        title: z.string().nullable(),
        sequence: z.number().nullable(),
      }),
    )
    .nullable(),
  dob: z.string().nullable(),
  fb: z.string().nullable(),
  twitter: z.string().nullable(),
  wiki: z.string().nullable(),
  availableLanguages: z.array(z.string()),
  isRadioPresent: z.boolean().nullable(),
  topSongs: z.array(SongModel).nullable(),
  topAlbums: z.array(AlbumModel).nullable(),
  singles: z.array(SongModel).nullable(),
  similarArtists: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        url: z.string(),
        image: z.array(DownloadLinkModel),
        languages: z.record(z.string(), z.string()).nullable(),
        wiki: z.string(),
        dob: z.string(),
        fb: z.string(),
        twitter: z.string(),
        isRadioPresent: z.boolean(),
        type: z.string(),
        dominantType: z.string(),
        aka: z.string(),
        bio: z.string().nullable(),
        similarArtists: z
          .array(
            z.object({
              id: z.string(),
              name: z.string(),
            }),
          )
          .nullable(),
      }),
    )
    .nullable(),
});

export const ArtistModelApiResponse = z.object({
  success: z.boolean(),
  data: ArtistModel,
  hasMoreTopSongs: z.boolean().optional(),
  hasMoreTopAlbums: z.boolean().optional(),
});

export interface ArtistModelApiParameters {
  artistId: String;
  page?: Number;
  songCount?: Number;
  albumCount?: Number;
  sortBy?: 'popularity' | 'latest' | 'alphabetical';
  sortOrder?: 'asc' | 'desc';
}
