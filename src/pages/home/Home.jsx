import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import Header from "../../components/header/Header";
import PlayList from "../../components/playlist/Playlist";
import "./home.css";
import Grid from "../../components/videoGrid/VideoGrid";
import AddtoPlaylistMenu from "../../components/AddToPlaylistMenu/AddToPlaylistMenu";
import VideoContext from "../../contexts/VideoPlayerContext/videoPlayerContext";

const HomePage = () => {
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.rootReducer.auth.signedIn);
	const PlaylistsData = useSelector((state) => state.rootReducer.playlists);

	useEffect(() => {
		const loggedInAs = localStorage.getItem("logged_in_as");
		if (!isLoggedIn || loggedInAs === null) {
			navigate("/");
		}
	}, [isLoggedIn, navigate]);

	const [videoID, setVideoID] = useState("");

	const updateVideoID = (id) => {
		setVideoID(id);
	};

	const value = useMemo(() => ({
		videoID,
		updateVideoID,
	}),[videoID]);


	return (
			<VideoContext.Provider value={value}>
					<>
						<Header />
						<div className="mainDiv">
							<div>
								<AddtoPlaylistMenu />
								<VideoPlayer />
								<Grid />
							</div>
							<div>
								{PlaylistsData.playlists.map((data, index) => (
										<PlayList
											videos={data.videos}
											title={data.title}
											index={index}
											key={data.title}
										/>
									))}
							</div>
						</div>
					</>
			</VideoContext.Provider>
	);
};

export default HomePage;
