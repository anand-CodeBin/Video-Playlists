import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import Header from "../../components/header/Header";
import PlayList from "../../components/playlist/Playlist";
import "./home.css";
import Grid from "../../components/videoGrid/VideoGrid";
import AddtoPlaylistMenu from "../../components/AddToPlaylistMenu/AddToPlaylistMenu";
import VideoContextProvider from "../../contexts/VideoPlayerContext/videoPlayerContext";

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

	return (
		<>
			<VideoContextProvider
				children={
					<>
						<Header />
						<div className="mainDiv">
							<div>
								<AddtoPlaylistMenu />
								<VideoPlayer />
								<Grid />
							</div>
							<div>
								{PlaylistsData.playlists.map((data, index) => {
									return (
										<PlayList
											videos={data.videos}
											title={data.title}
											index={index}
											key={index}
										/>
									);
								})}
							</div>
						</div>
					</>
				}
			/>
		</>
	);
};

export default HomePage;
