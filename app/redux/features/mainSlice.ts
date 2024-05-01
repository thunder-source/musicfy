import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  musicLanguage: ['hindi'],
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMusicLanguage: (state, action) => {
      state.musicLanguage = action.payload;
    },
  },
});

export const { setMusicLanguage } = mainSlice.actions;

export default mainSlice.reducer;
