import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
	playlists: [
		{
			title: "My First Playlist",
			videos: ["tgB1wUcmbbw", "8bpZg8V3Onk"],
		},
	],
	playlistMenuState: {
		visible: false,
		videoInProcess: null,
	},
};

const InitialPlaylistState = {
	title: "",
	videos: [],
};

const playlistSlice = createSlice({
	name: "playlists",
	initialState: InitialState,
	reducers: {
		createPlaylist: (state, action) => {
			let newPlaylist = { ...InitialPlaylistState };
			newPlaylist.title = action.payload.title;
			state.playlists.push(newPlaylist);
		},
		addToPlaylist: (state, action) => {
			if (
				!state.playlists[action.payload.index].videos.includes(
					state.playlistMenuState.videoInProcess.ID
				)
			) {
				state.playlists[action.payload.index].videos.push(
					state.playlistMenuState.videoInProcess.ID
				);
			}
		},
		updateMenuState: (state, action) => {
			state.playlistMenuState.visible = action.payload.visible;
			state.playlistMenuState.videoInProcess = action.payload.videoData;
		},
		clearPlaylists: (state, action) => {
			state.playlists = [];
			state.playlistMenuState = {
				visible: false,
				videoInProcess: null,
			};
		},
	},
});

export const {
	createPlaylist,
	addToPlaylist,
	updateMenuState,
	clearPlaylists,
} = playlistSlice.actions;

export default playlistSlice.reducer;
