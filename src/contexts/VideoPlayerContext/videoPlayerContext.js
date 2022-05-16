import React, { createContext, useState } from "react";

export const VideoContext = createContext("");

const VideoContextProvider = ({ children }) => {
	const [videoID, setVideoID] = useState("");

	let updateVideoID = (id) => {
		setVideoID(id);
	};

	let value = {
		videoID,
		updateVideoID,
	};
	return (
		<VideoContext.Provider value={value}>{children}</VideoContext.Provider>
	);
};

export default VideoContextProvider;
