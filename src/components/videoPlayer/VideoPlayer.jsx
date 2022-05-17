import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { VideoContext } from "../../contexts/VideoPlayerContext/videoPlayerContext";
import axios from "axios";
import "./videoplayer.css";
import { useSelector } from "react-redux";
import { URL_LoadVideosData } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

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
			try {
				let APIcallUrl = URL_LoadVideosData + `&id=${currentVideoID}`;
				const videoData = await axios.get(APIcallUrl);
				setvideoDetails(videoData.data.items[0]);
			} catch {}
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
						<div style={{ maxWidth: "60vw" }}>
							<p className="VideoPlayerTitle">{videoDetails.snippet.title}</p>
						</div>
						<div className="likeCountHolder">
							<FontAwesomeIcon icon={faThumbsUp} className="thumbsUp" />
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
