import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './videoplayer.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import  VideoContext  from '../../contexts/VideoPlayerContext/videoPlayerContext';
import { URLLoadVideosData } from '../../utils';

function VideoPlayer() {
  const videoCtx = useContext(VideoContext);

  const [videoDetails, setvideoDetails] = useState();
  const [currentVideoID, setcurrentVideoID] = useState('');

  const topVideo = useSelector(
    (state) => state?.rootReducer?.api?.recommendedVideos[0]?.id,
  );
  useEffect(() => {
    if (videoCtx.videoID === '') {
      setcurrentVideoID(topVideo);
    } else {
      setcurrentVideoID(videoCtx.videoID);
			window.scroll(0,0)
    }
    const getVideoData = async () => {
      try {
        const APIcallUrl = `${URLLoadVideosData}&id=${currentVideoID}`;
        const videoData = await axios.get(APIcallUrl);
        setvideoDetails(videoData.data.items[0]);
      } catch {
        setvideoDetails(null);
      }
    };
    getVideoData();
  }, [videoCtx.videoID, currentVideoID, topVideo]);

  return (
    <div className="videoPlayerHolder">
      <iframe
        className="videoPlayer"
        src={`https://www.youtube.com/embed/${currentVideoID}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      {videoDetails !== undefined ? (
        <>
          <div style={{ maxWidth: '60vw' }}>
            <p className="VideoPlayerTitle">{videoDetails.snippet.title}</p>
          </div>
          <div className="likeCountHolder">
            <FontAwesomeIcon icon={faThumbsUp} className="thumbsUp" />
            <p>
              {videoDetails.statistics.likeCount
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {' '}
              Likes
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default VideoPlayer;
