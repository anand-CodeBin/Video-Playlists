import React, { useContext, useEffect, useState } from "react";
import VideoCard from "../videoCard/VideoCard";
import arrow from "../../assets/icons/arrow.png";
import "./playlist.css";
import axios from "axios";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import { URL_LoadVideosData } from "../../utils";
const PlayList = ({ videos, title }) => {
	const [playlistVisible, toggleplaylistVisible] = useState(false);
	const [playlistData, updatePlaylistData] = useState([]);

	const handleArrowClick = () => {
		toggleplaylistVisible(!playlistVisible);
	};

	const videoplayerContext = useContext(VideoContext);
	const playVideo = (id) => {
		videoplayerContext.updateVideoID(id);
	};

	useEffect(() => {
		let videosAPIcallSuffix = "";
		videos.map((data, index) => {
			videosAPIcallSuffix += `&id=${data}`;
			return null;
		});
		const getPlaylistData = async () => {
			let APIcallUrl = URL_LoadVideosData + videosAPIcallSuffix;
			const APIresponse = await axios.get(APIcallUrl);
			updatePlaylistData(APIresponse.data);
		};

		getPlaylistData();
	}, [videos]);
	return (
		<>
			<div className="playlistHolder">
				<div className="titleDiv" onClick={() => handleArrowClick()}>
					<p className="PlayListTitle">{title}</p>
					<img
						src={arrow}
						alt=""
						className="arrow"
						style={playlistVisible ? {} : { transform: "rotateZ(180deg)" }}
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
										<>
											<VideoCard
												key={data.id + index}
												AddedInPlaylist={true}
												videoMetaData={videoMetaData}
												thumbnailClickHandle={playVideo}
												thumbnailClickHandleProps={videoMetaData.ID}
											/>
										</>
									);
							  })}
					</>
				) : null}
			</div>
		</>
	);
};

export default PlayList;
