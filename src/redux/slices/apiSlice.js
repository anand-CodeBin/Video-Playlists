import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL_PopularVideos } from "../../utils";

const InitialState = {
	recommendedVideos: [],
	status: "",
	loading: false,
};

const apiSlice = createSlice({
	name: "api",
	initialState: InitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadPopularVideos.pending, (state, action) => {
			state.status = "Loading ...";
			state.loading = true;
		});
		builder.addCase(loadPopularVideos.fulfilled, (state, action) => {
			state.recommendedVideos = action.payload;
			state.status = "";
			state.loading = false;
		});
		builder.addCase(loadPopularVideos.rejected, (state, action) => {
			state.status = "Failed.";
			state.loading = false;
		});
	},
});

export const loadPopularVideos = createAsyncThunk(
	"LoadPopularVideo",
	async (state) => {
		const videos = await axios.get(URL_PopularVideos);

		return videos.data.items;
	}
);

export default apiSlice.reducer;
