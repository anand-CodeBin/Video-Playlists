import { createSlice } from "@reduxjs/toolkit";
import jwtEncode from "jwt-encode";

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
			state.email = actions.payload;
			const auths = {
				mail: actions.payload,
			};
			const jwtToken = jwtEncode(auths, "secret");
			if (state.rememberMe) {
				localStorage.setItem("loginMail", actions.payload);
			} else {
				localStorage.removeItem("loginMail");
			}
			localStorage.setItem("logged_in_as", jwtToken);
		},
		signOut: (state) => {
			state.signedIn = false;
			localStorage.removeItem("logged_in_as");
		},
		rememberMe: (state) => {
			state.rememberMe = !state.rememberMe;
		},
	},
});

export const { signIn, signOut, rememberMe } = authSlice.actions;

export default authSlice.reducer;
