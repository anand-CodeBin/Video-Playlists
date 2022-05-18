/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { URLPopularVideos } from '../../utils';

const InitialState = {
  recommendedVideos: [],
  status: '',
  loading: false,
};

export const loadPopularVideos = createAsyncThunk(
  'LoadPopularVideo',
  async () => {
    const videos = await axios.get(URLPopularVideos);

    return videos.data.items;
  },
);

const apiSlice = createSlice({
  name: 'api',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPopularVideos.pending, (state) => {
      state.status = 'Loading ...';
      state.loading = true;
    });
    builder.addCase(loadPopularVideos.fulfilled, (state, action) => {
      state.recommendedVideos = action.payload;
      state.status = '';
      state.loading = false;
    });
    builder.addCase(loadPopularVideos.rejected, (state) => {
      state.status = 'Failed.';
      state.loading = false;
    });
  },
});

export default apiSlice.reducer;
