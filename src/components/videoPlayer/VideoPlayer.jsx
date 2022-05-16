import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import axios from "axios";
import thumbsUp from "../../assets/icons/thumbs-up.png";
import "./videoplayer.css";

const VideoPlayer = () => {
	const videoCtx = useContext(VideoContext);
	const [videoDetails, setvideoDetails] = useState();

	useEffect(() => {
		const getVideoData = async () => {
			let APIcallUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoCtx.videoID}&key=AIzaSyD2KpYc1h0gQ8SGQMdMJTXvjL86sRanW6g`;
			const videoData = await axios.get(APIcallUrl);
			setvideoDetails(videoData.data.items[0]);
		};
		getVideoData();
	}, [videoCtx.videoID]);
	return (
		<>
			<div className="videoPlayerHolder">
				<iframe
					className="videoPlayer"
					src={"https://www.youtube.com/embed/" + videoCtx.videoID}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>
				{videoDetails !== undefined ? (
					<>
						<p> {videoDetails.statistics.viewCount} Views</p>
						<div className="likeCountHolder">
							<img className="thumbsUp" src={thumbsUp} alt="thumbs up" />
							<p>{videoDetails.statistics.likeCount} Likes</p>
						</div>
					</>
				) : null}
			</div>
		</>
	);
};

export default VideoPlayer;
