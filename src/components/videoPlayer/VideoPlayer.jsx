import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import axios from "axios";
import thumbsUp from "../../assets/icons/thumbs-up.png";
import "./videoplayer.css";
import { useSelector } from "react-redux";

const VideoPlayer = () => {
	const videoCtx = useContext(VideoContext);

	const [videoDetails, setvideoDetails] = useState();
	const [currentVideoID, setcurrentVideoID] = useState("");

	const topVideo = useSelector(
		(state) => state?.rootReducer?.api?.recommendedVideos[0]?.id
	);
	useEffect(() => {
		if (videoCtx.videoID === "") {
			setcurrentVideoID(topVideo);
		} else {
			setcurrentVideoID(videoCtx.videoID);
		}
		const getVideoData = async () => {
			let APIcallUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${currentVideoID}&key=AIzaSyD2KpYc1h0gQ8SGQMdMJTXvjL86sRanW6g`;
			const videoData = await axios.get(APIcallUrl);
			setvideoDetails(videoData.data.items[0]);
		};
		getVideoData();
	}, [videoCtx.videoID, currentVideoID, topVideo]);

	return (
		<>
			<div className="videoPlayerHolder">
				<iframe
					className="videoPlayer"
					src={"https://www.youtube.com/embed/" + currentVideoID}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				></iframe>
				{videoDetails !== undefined ? (
					<>
						{/* <p>
							{" "}
							{videoDetails.statistics.viewCount
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
							Views
						</p> */}
						<div style={{ maxWidth: "60vw" }}>
							<p className="VideoPlayerTitle">{videoDetails.snippet.title}</p>
						</div>
						<div className="likeCountHolder">
							<img className="thumbsUp" src={thumbsUp} alt="thumbs up" />
							<p>
								{videoDetails.statistics.likeCount
									.toString()
									.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
								Likes
							</p>
						</div>
					</>
				) : null}
			</div>
		</>
	);
};

export default VideoPlayer;
