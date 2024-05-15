import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musicLanguage: ['hindi'],
  likedSongs: {
    ids: [],
    data: {},
  },
  likedAlbums: {
    ids: [],
    data: {},
  },
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMusicLanguage: (state, action) => {
      state.musicLanguage = action.payload;
    },
    // addLikedSong: (state, { payload }) => {
    //   state.likedSongs[payload] = true;
    // },
    // RemoveLikedSong: (state, { payload }) => {
    //   state.likedSongs[payload] = false;
    // },
  },
});

export const { setMusicLanguage } = mainSlice.actions;

export default mainSlice.reducer;
