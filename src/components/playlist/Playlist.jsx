import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../videoCard/VideoCard";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import { URL_LoadVideosData } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./playlist.css";
import { useSelector } from "react-redux";

const PlayList = ({ videos, title, index }) => {
	const [playlistVisible, toggleplaylistVisible] = useState(false);
	const [playlistData, updatePlaylistData] = useState([]);
	const playlistVideos = useSelector(
		(state) => state.rootReducer.playlists.playlists[index].videos
	);

	const handleArrowClick = () => {
		toggleplaylistVisible(!playlistVisible);
	};

	const videoplayerContext = useContext(VideoContext);
	const playVideo = (id) => {
		if (videoplayerContext.videoID !== id) {
			videoplayerContext.updateVideoID(id);
		}
	};

	useEffect(() => {
		let videosAPIcallSuffix = "";
		playlistVideos.map((id, index) => {
			videosAPIcallSuffix += `&id=${id}`;
			return null;
		});
		const getPlaylistData = async () => {
			try {
				if (playlistVideos.length > 0) {
					let APIcallUrl = URL_LoadVideosData + videosAPIcallSuffix;
					const APIresponse = await axios.get(APIcallUrl);
					updatePlaylistData(APIresponse.data);
				} else {
					updatePlaylistData([]);
				}
			} catch {}
		};

		getPlaylistData();
	}, [playlistVideos]);
	return (
		<>
			<div className="playlistHolder">
				<div className="titleDiv" onClick={() => handleArrowClick()}>
					<p className="PlayListTitle">{title}</p>
					<FontAwesomeIcon
						icon={playlistVisible ? faAngleUp : faAngleDown}
						className="arrow"
					/>
				</div>
				{playlistVisible ? (
					<>
						{playlistData.items === undefined
							? null
							: playlistData.items.length > 0
							? playlistData.items.map((data, index) => {
									const videoMetaData = {
										ID: data.id,
										title: data.snippet.title,
										views: data.statistics.viewCount,
										thumbnail: data.snippet.thumbnails.high.url,
									};
									return (
										<VideoCard
											key={data.id + index}
											AddedInPlaylist={true}
											videoMetaData={videoMetaData}
											thumbnailClickHandle={playVideo}
											thumbnailClickHandleProps={videoMetaData.ID}
										/>
									);
							  })
							: null}
					</>
				) : null}
			</div>
		</>
	);
};

export default PlayList;
