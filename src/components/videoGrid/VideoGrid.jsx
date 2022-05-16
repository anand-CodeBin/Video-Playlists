import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPopularVideos } from "../../redux/slices/apiSlice";
import VideoCard from "../videoCard/VideoCard";
import "./grid.css";

const Grid = () => {
	const dispatch = useDispatch();
	const recommendedVideos = useSelector(
		(state) => state.rootReducer.api.recommendedVideos
	);
	const status = useSelector((state) => state.rootReducer.api.status);

	useEffect(() => {
		dispatch(loadPopularVideos());
	}, [dispatch]);

	return (
		<>
			<p>{status}</p>

			<div className="gridDiv">
				{recommendedVideos.map((data, index) => {
					return (
						<VideoCard
							thumbnail={data.snippet.thumbnails.high.url}
							title={data.snippet.title}
							views={data.statistics.viewCount}
							id={data.id}
							key={index}
						/>
					);
				})}
			</div>
		</>
	);
};

export default Grid;
