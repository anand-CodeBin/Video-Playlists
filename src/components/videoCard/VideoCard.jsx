import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { updateMenuState } from "../../redux/slices/playlistSlice";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import "./videocard.css";

const VideoCard = ({
	title = "",
	thumbnail = "https://images.pexels.com/photos/1261169/pexels-photo-1261169.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
	views = 0,
	AddedInPlaylist = false,
	id = "",
	addInPlaylistHandler = () => {},
}) => {
	const videoMetaData = {
		ID: id,
		title: title,
		views: views,
		thumbnail: thumbnail,
	};
	const dispatch = useDispatch();
	const videoplayerContext = useContext(VideoContext);

	const playVideo = () => {
		console.log(id);
		videoplayerContext.updateVideoID(id);
	};
	const handleAddPlaylist = () => {
		// if (!addToPlaylist) {
		dispatch(
			updateMenuState({
				videoData: videoMetaData,
				visible: true,
			})
		);
		// }
	};

	return (
		<>
			<div className="videoCard">
				<img className="thumb" alt="" src={thumbnail} onClick={playVideo} />
				<p>{title}</p>
				<p>
					{views > 1000000
						? Math.round(views / 1000000) + " M "
						: views > 1000
						? Math.round(views / 1000) + " K "
						: views + " "}
					Views
					<span
						className="AddtoPlaylist"
						onClick={(e) => {
							handleAddPlaylist();
						}}
					>
						{AddedInPlaylist ? null : "+"}
					</span>
				</p>
			</div>
		</>
	);
};

export default VideoCard;

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyD2KpYc1h0gQ8SGQMdMJTXvjL86sRanW6g
