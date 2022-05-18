import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import VideoCard from '../videoCard/VideoCard';
import  VideoContext  from '../../contexts/VideoPlayerContext/videoPlayerContext';
import { URLLoadVideosData } from '../../utils';
import './playlist.css';

function PlayList({ title, index }) {
  const [playlistVisible, toggleplaylistVisible] = useState(false);
  const [playlistData, updatePlaylistData] = useState([]);
	const [dataPending, setdataPending] = useState(true);
  const playlistVideos = useSelector(
    (state) => state.rootReducer.playlists.playlists[index].videos,
  );

  const handleArrowClick = () => {
    toggleplaylistVisible(!playlistVisible);
  };

  const videoplayerContext = useContext(VideoContext);
  const playVideo = (id) => {
    if (videoplayerContext.videoID !== id) {
      videoplayerContext.updateVideoID(id);
    }
  };

  useEffect(() => {
    let videosAPIcallSuffix = '';
    playlistVideos.map((id) => {
      videosAPIcallSuffix += `&id=${id}`;
      return null;
    });
    const getPlaylistData = async () => {
      try {
        if (playlistVideos.length > 0) {
          const APIcallUrl = URLLoadVideosData + videosAPIcallSuffix;
					setdataPending(true);
          const APIresponse = await axios.get(APIcallUrl);
          updatePlaylistData(APIresponse.data);
					setdataPending(false);
        } else {
          updatePlaylistData([]);
					setdataPending(false);
        }
      } catch {
        updatePlaylistData([]);
				setdataPending(false);
      }
    };

    getPlaylistData();
  }, [playlistVideos]);
	if(dataPending) return (
		<FontAwesomeIcon icon={faSpinner} className="fa-spin loader" />
	)
  return (
  	<div className="playlistHolder">
      <div className="titleDiv" onClick={() => handleArrowClick()} onKeyDown={() => handleArrowClick()} role="button" tabIndex={index}>
        <p className="PlayListTitle">{title}</p>
        <FontAwesomeIcon
          icon={playlistVisible ? faAngleUp : faAngleDown}
          className="arrow"
        />
      </div>
      {playlistVisible && playlistData.items !== undefined 
        ? playlistData.items.map((data) => {
          const videoMetaData = {
            ID: data.id,
            title: data.snippet.title,
            views: data.statistics.viewCount,
            thumbnail: data.snippet.thumbnails.high.url,
          };
          return (
            <VideoCard
              key={data.id}
              AddedInPlaylist
              videoMetaData={videoMetaData}
              thumbnailClickHandle={playVideo}
              thumbnailClickHandleProps={videoMetaData.ID}
            />
          );
        })
        : null}
    </div>
  );
}

PlayList.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default PlayList;
