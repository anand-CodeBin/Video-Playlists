import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { loadPopularVideos } from '../../redux/slices/apiSlice';
import VideoCard from '../videoCard/VideoCard';
import { updateMenuState } from '../../redux/slices/playlistSlice';
import './grid.css';
import  VideoContext  from '../../contexts/VideoPlayerContext/videoPlayerContext';

function Grid() {
  const dispatch = useDispatch();
  const recommendedVideos = useSelector(
    (state) => state.rootReducer.api.recommendedVideos,
  );
  const isLoading = useSelector((state) => state.rootReducer.api.loading);

  const handleAddPlaylist = (videoMetaData) => {
    dispatch(
      updateMenuState({
        videoData: videoMetaData,
        visible: true,
      }),
    );
  };

  const videoplayerContext = useContext(VideoContext);
  const playVideo = (id) => {
    if (videoplayerContext.videoID !== id) {
      videoplayerContext.updateVideoID(id);
    }
  };

  useEffect(() => {
    dispatch(loadPopularVideos());
  }, [dispatch]);

  return (
  	<>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} className="fa-spin loader" />
      ) : null}
      <div className="gridDiv">
        {recommendedVideos.map((data) => {
          const videoMetaData = {
            ID: data.id,
            title: data.snippet.title,
            views: parseInt(data.statistics.viewCount,10),
            thumbnail: data.snippet.thumbnails.high.url,
          };

          return (
            <VideoCard
              key={data.id}
              videoMetaData={videoMetaData}
              addInPlaylistHandler={handleAddPlaylist}
              thumbnailClickHandle={playVideo}
              thumbnailClickHandleProps={videoMetaData.ID}
            />
          );
        })}
      </div>
    </>
  );
}

export default Grid;
