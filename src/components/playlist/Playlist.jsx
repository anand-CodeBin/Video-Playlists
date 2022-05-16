import React, { useEffect, useState } from "react";
import VideoCard from "../videoCard/VideoCard";
import arrow from "../../assets/icons/arrow.png";
import "./playlist.css";
import axios from "axios";
const PlayList = ({ videos, title }) => {
	const [playlistVisible, toggleplaylistVisible] = useState(false);
	const [playlistData, updatePlaylistData] = useState([]);

	const handleArrowClick = () => {
		toggleplaylistVisible(!playlistVisible);
	};

	useEffect(() => {
		let videosAPIcallSuffix = "";
		videos.map((data, index) => {
			videosAPIcallSuffix += `&id=${data}`;
			return null;
		});
		const getPlaylistData = async () => {
			let APIcallUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&${videosAPIcallSuffix}&key=AIzaSyD2KpYc1h0gQ8SGQMdMJTXvjL86sRanW6g`;
			const APIresponse = await axios.get(APIcallUrl);
			updatePlaylistData(APIresponse.data);
		};

		getPlaylistData();
	}, [videos]);
	return (
		<>
			<div className="playlistHolder">
				<div className="titleDiv">
					<p className="PlayListTitle">{title}</p>
					<img
						src={arrow}
						alt=""
						className="arrow"
						style={playlistVisible ? {} : { transform: "rotateZ(180deg)" }}
						onClick={() => handleArrowClick()}
					/>
				</div>
				{playlistVisible ? (
					<>
						{playlistData.items === undefined
							? null
							: playlistData.items.map((data, index) => {
									return (
										<>
											<VideoCard
												key={index}
												id={data.id}
												thumbnail={data.snippet.thumbnails.high.url}
												AddedInPlaylist={true}
												title={data.snippet.title}
												views={data.statistics.viewCount}
											/>
										</>
									);
							  })}
						{/* 
					<VideoCard />
					<VideoCard />
					<VideoCard />
					<VideoCard /> */}
					</>
				) : null}
			</div>
		</>
	);
};

export default PlayList;
