import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
	playlists: [],
	playlistMenuState: {
		visible: false,
		videoInProcess: null,
	},
	tempPlaylists: null,
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
			const ID = state.playlistMenuState.videoInProcess.ID;
			let PlaylistVideos = [...state.playlists[action.payload.index].videos];
			if (!PlaylistVideos.includes(ID)) {
				PlaylistVideos.push(ID);
			} else {
				let tempPlaylist = [];
				tempPlaylist = [
					...PlaylistVideos.slice(0, PlaylistVideos.indexOf(ID)),
					...PlaylistVideos.slice(PlaylistVideos.indexOf(ID) + 1),
				];
				PlaylistVideos = tempPlaylist;
			}
			state.playlists[action.payload.index].videos = PlaylistVideos;
		},
		confirmUpdatePlaylists: (state) => {
			state.tempPlaylists = null;
		},
		cancelUpdatePlaylists: (state) => {
			state.playlists = state.tempPlaylists;
		},
		updateMenuState: (state, action) => {
			state.tempPlaylists = state.playlists;
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
	confirmUpdatePlaylists,
	cancelUpdatePlaylists,
} = playlistSlice.actions;

export default playlistSlice.reducer;
