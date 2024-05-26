import { z } from 'zod';
import { DownloadLinkModel } from '../common/download.model';

const SearchResponseModel = <T>(model: z.ZodType<T, any, any>) =>
  z.object({
    results: model,
    position: z.number(),
  });

export const SearchModel = z.object({
  albums: SearchResponseModel(
    z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        image: z.array(DownloadLinkModel),
        artist: z.string(),
        url: z.string(),
        type: z.string(),
        description: z.string(),
        year: z.string(),
        language: z.string(),
        songIds: z.string(),
      }),
    ),
  ),
  songs: SearchResponseModel(
    z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        image: z.array(DownloadLinkModel),
        album: z.string(),
        url: z.string(),
        type: z.string(),
        description: z.string(),
        primaryArtists: z.string(),
        singers: z.string(),
        language: z.string(),
      }),
    ),
  ),
  artists: SearchResponseModel(
    z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        image: z.array(DownloadLinkModel),
        type: z.string(),
        description: z.string(),
        position: z.number(),
      }),
    ),
  ),
  playlists: SearchResponseModel(
    z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        image: z.array(DownloadLinkModel),
        url: z.string(),
        language: z.string(),
        type: z.string(),
        description: z.string(),
      }),
    ),
  ),
  topQuery: SearchResponseModel(
    z.array(
      z.object({
        id: z.string(),
        title: z.string(),
        image: z.array(DownloadLinkModel),
        album: z.string(),
        url: z.string(),
        type: z.string(),
        description: z.string(),
        primaryArtists: z.string(),
        singers: z.string(),
        language: z.string(),
      }),
    ),
  ),
});

export const SearchModelApiResponse = z.object({
  success: z.boolean(),
  data: SearchModel,
});

export const SearchModelApiRedux = SearchModel;

export type SearchModelApiParameters = {
  query: string;
};
