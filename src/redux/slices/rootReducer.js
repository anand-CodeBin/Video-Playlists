import { combineReducers } from "@reduxjs/toolkit";
import playlistSlice from "./playlistSlice";
import authSlice from "./authSlice";
import apiSlice from "./apiSlice";
const rootReducer = combineReducers({
	playlists: playlistSlice,
	auth: authSlice,
	api: apiSlice,
});

export default rootReducer;
