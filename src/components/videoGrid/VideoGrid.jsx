import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPopularVideos } from "../../redux/slices/apiSlice";
import VideoCard from "../videoCard/VideoCard";
import { updateMenuState } from "../../redux/slices/playlistSlice";
import "./grid.css";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Grid = () => {
	const dispatch = useDispatch();
	const recommendedVideos = useSelector(
		(state) => state.rootReducer.api.recommendedVideos
	);
	const isLoading = useSelector((state) => state.rootReducer.api.loading);

	const handleAddPlaylist = (videoMetaData) => {
		dispatch(
			updateMenuState({
				videoData: videoMetaData,
				visible: true,
			})
		);
	};

	const videoplayerContext = useContext(VideoContext);
	const playVideo = (id) => {
		videoplayerContext.updateVideoID(id);
	};

	useEffect(() => {
		dispatch(loadPopularVideos());
	}, [dispatch]);

	return (
		<>
			{isLoading ? (
				<FontAwesomeIcon icon={faSpinner} className="fa-spin loader" />
			) : null}
			<div className="gridDiv">
				{recommendedVideos.map((data, index) => {
					const videoMetaData = {
						ID: data.id,
						title: data.snippet.title,
						views: data.statistics.viewCount,
						thumbnail: data.snippet.thumbnails.high.url,
					};

					return (
						<VideoCard
							key={data.id}
							videoMetaData={videoMetaData}
							addInPlaylistHandler={handleAddPlaylist}
							addInPlaylistHandlerProps={videoMetaData}
							thumbnailClickHandle={playVideo}
							thumbnailClickHandleProps={videoMetaData.ID}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Grid;
