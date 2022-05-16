import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
	signedIn: false,
	rememberMe: false,
	email: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState: InitialState,
	reducers: {
		signIn: (state, actions) => {
			state.signedIn = true;
			if (state.rememberMe) {
				localStorage.setItem("loginMail", actions.payload);
			}
		},
		signOut: (state) => {
			state.signedIn = false;
		},
		rememberMe: (state) => {
			state.rememberMe = !state.rememberMe;
		},
	},
});

export const { signIn, signOut, rememberMe } = authSlice.actions;

export default authSlice.reducer;
