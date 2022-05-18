import React from 'react';
import './videocard.css';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function VideoCard({
  AddedInPlaylist = false,
  videoMetaData = {},
  addInPlaylistHandler = () => {},
  thumbnailClickHandle = () => {},
  thumbnailClickHandleProps = {},
}) {
  let views = '';
  if (videoMetaData.views > 1000000) {
    views = `${Math.round(videoMetaData.views / 1000000)}M Views`;
  } else if (videoMetaData.views > 1000) {
    views = `${Math.round(videoMetaData.views / 1000)}K Views`;
  } else {
    views = `${videoMetaData.views} Views`;
  }
  return (
  	<Card className="videoCard">
      <Card.Img
        src={videoMetaData.thumbnail}
        onClick={() => thumbnailClickHandle(thumbnailClickHandleProps)}
      />
      <Card.Body>
        <Card.Title>{videoMetaData.title}</Card.Title>
        <Card.Text>
          {views}
        </Card.Text>

				<Card.Text
            className="AddtoPlaylist"
            onClick={() => {
              addInPlaylistHandler(videoMetaData);
            }}
          >
            {AddedInPlaylist ? null : '+'}
          </Card.Text>
      </Card.Body>
    </Card>
  );
}

VideoCard.propTypes = {
  AddedInPlaylist: PropTypes.bool,
  videoMetaData: PropTypes.shape({
    ID: PropTypes.string,
    title: PropTypes.string,
    views: PropTypes.number,
    thumbnail: PropTypes.string,
  }).isRequired,
  addInPlaylistHandler: PropTypes.func,
  thumbnailClickHandle: PropTypes.func,
  thumbnailClickHandleProps: PropTypes.string,
};

VideoCard.defaultProps = {
	AddedInPlaylist : false,
  addInPlaylistHandler: () => {},
  thumbnailClickHandle: () => {},
  thumbnailClickHandleProps: {},
};
export default VideoCard;
