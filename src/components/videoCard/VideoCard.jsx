import React from "react";
import "./videocard.css";

const VideoCard = ({
	AddedInPlaylist = false,
	videoMetaData = {},
	addInPlaylistHandler = () => {},
	addInPlaylistHandlerProps = {},
	thumbnailClickHandle = () => {},
	thumbnailClickHandleProps = {},
}) => {
	return (
		<div className="videoCard">
			<img
				className="thumb"
				alt=""
				src={videoMetaData.thumbnail}
				onClick={(e) => thumbnailClickHandle(thumbnailClickHandleProps)}
			/>
			<p>{videoMetaData.title}</p>
			<p>
				{videoMetaData.views > 1000000
					? Math.round(videoMetaData.views / 1000000) + "M "
					: videoMetaData.views > 1000
					? Math.round(videoMetaData.views / 1000) + "K "
					: videoMetaData.views + " "}
				Views
				<span
					className="AddtoPlaylist"
					onClick={(e) => {
						addInPlaylistHandler(addInPlaylistHandlerProps);
					}}
				>
					{AddedInPlaylist ? null : "+"}
				</span>
			</p>
		</div>
	);
};

export default VideoCard;
