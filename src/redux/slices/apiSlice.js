import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const InitialState = {
	recommendedVideos: [],
	status: "",
};

const apiSlice = createSlice({
	name: "api",
	initialState: InitialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(loadPopularVideos.pending, (state, action) => {
			state.status = "Loading ...";
		});
		builder.addCase(loadPopularVideos.fulfilled, (state, action) => {
			state.recommendedVideos = action.payload;
			state.status = "";
		});
		builder.addCase(loadPopularVideos.rejected, (state, action) => {
			state.status = "Failed.";
		});
	},
});

export const loadPopularVideos = createAsyncThunk(
	"LoadPopularVideo",
	async (state) => {
		const videos = await axios.get(
			"https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=US&key=AIzaSyD2KpYc1h0gQ8SGQMdMJTXvjL86sRanW6g"
		);

		return videos.data.items;
	}
);

export default apiSlice.reducer;
