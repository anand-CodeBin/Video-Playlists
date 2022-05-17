import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../videoCard/VideoCard";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import { URL_LoadVideosData } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "./playlist.css";

const PlayList = ({ videos, title }) => {
	const [playlistVisible, toggleplaylistVisible] = useState(false);
	const [playlistData, updatePlaylistData] = useState([]);

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
		videos.map((data, index) => {
			videosAPIcallSuffix += `&id=${data}`;
			return null;
		});
		const getPlaylistData = async () => {
			try {
				let APIcallUrl = URL_LoadVideosData + videosAPIcallSuffix;
				const APIresponse = await axios.get(APIcallUrl);
				updatePlaylistData(APIresponse.data);
			} catch {}
		};

		getPlaylistData();
	}, [videos]);
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
							: playlistData.items.map((data, index) => {
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
							  })}
					</>
				) : null}
			</div>
		</>
	);
};

export default PlayList;
