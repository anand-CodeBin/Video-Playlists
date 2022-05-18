import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button as BootStrapBtn } from 'react-bootstrap';
import {
  addToPlaylist,
  updateMenuState,
  createPlaylist,
  confirmUpdatePlaylists,
  cancelUpdatePlaylists,
} from '../../redux/slices/playlistSlice';
import Button from '../Button/Button';
import CheckBox from '../Checkbox/Checkbox';
import TextInput from '../TextInput/TextInput';
import './PlaylistMenu.css';

function AddtoPlaylistMenu() {
  const dispatch = useDispatch();
  const [newPlaylistTitle, setnewPlaylistTitle] = useState('');
  const [newplaylistSelected, toggleNewplaylistSelected] = useState(false);
  const [createBtnEnabled, togglecreateBtnEnabled] = useState(false);
  const [duplicateTitle, setduplicateTitle] = useState(false);
  const menuState = useSelector(
    (state) => state.rootReducer.playlists.playlistMenuState,
  );

  const playlistsData = useSelector((state) => ({
    playlists: state.rootReducer.playlists.playlists,
    menuState: state.rootReducer.playlists.playlistMenuState,
  }));

  const addToPlaylistHandle = (checkboxValue, index) => {
    dispatch(
      addToPlaylist({
        index,
      }),
    );
  };

  const closeMenu = () => {
    toggleNewplaylistSelected(false);
    dispatch(
      updateMenuState({
        visible: false,
      }),
    );
  };

  const createplaylist = () => {
    if (createBtnEnabled) {
      toggleNewplaylistSelected(false);
      dispatch(
        createPlaylist({
          title: newPlaylistTitle.trim(),
        }),
      );
    }
  };
  const createNewPlaylistSelected = () => {
    toggleNewplaylistSelected(true);
    setnewPlaylistTitle('');
  };
  const confirmUpdate = () => {
    toggleNewplaylistSelected(false);
    dispatch(confirmUpdatePlaylists());
    closeMenu();
  };
  const cancelUpdate = () => {
    dispatch(cancelUpdatePlaylists());
    closeMenu();
  };

  useEffect(() => {
    if (newPlaylistTitle !== '') {
      const DuplicateTitle = (obj) => obj.title === newPlaylistTitle;
      if (playlistsData.playlists.some(DuplicateTitle)) {
        setduplicateTitle(false);
        togglecreateBtnEnabled(false);
      } else {
        setduplicateTitle(true);
        togglecreateBtnEnabled(true);
      }
    } else if (newPlaylistTitle === '') {
      setduplicateTitle(true);
      togglecreateBtnEnabled(false);
    }
  }, [newPlaylistTitle, playlistsData.playlists]);

  if (!menuState.visible || menuState.videoInProcess == null) return null;
  return (
  	<div className="menuParent">
      <div className="MenuHolder">
        <h1>
          {menuState.videoInProcess.title}
          {' '}
        </h1>
        <div className="playlistOptionsHolder">
          {playlistsData.playlists.map((data, index) => {
            data.videos.includes(menuState.videoInProcess.ID);
            return (
              <div className="playlistOption" key={data.title}>
                <CheckBox
                  label={data.title}
                  onChangeFunc={addToPlaylistHandle}
                  extraPropsForCB={index}
                  checked={!!data.videos.includes(menuState.videoInProcess.ID)}
                />
              </div>
            );
          })}
        </div>

        {newplaylistSelected ? (
          <div className="createPlaylistInputHolder">
            <TextInput
              Inputstyles={{
                borderBottom: '2px solid black',
                outlineColor: 'red',
              }}
              placeholder="Title"
              value={newPlaylistTitle}
              onChangeFunc={setnewPlaylistTitle}
              autoFocus
            />
            <div className="MenuWarning">
              <p>
                {duplicateTitle
                  ? ''
                  : `Playlist named ${newPlaylistTitle} already exists.`}
              </p>
            </div>
            <Button
              text="Create Playlist"
              TextColor={createBtnEnabled ? '#fff' : '#000'}
              ButtonColor={createBtnEnabled ? '#EA3946' : '#e5e5e5'}
              onClickHandler={createplaylist}
            />
          </div>
        ) : (
          <BootStrapBtn
            variant="link"
            className="createplaylistOption"
            onClick={() => createNewPlaylistSelected()}
          >
            + Create Playlist
          </BootStrapBtn>
        )}

        <Button
          text="Done"
          TextColor="#fff"
          ButtonColor="#EA3946"
          onClickHandler={confirmUpdate}
        />
        <Button
          text="Cancel"
          TextColor="#838383"
          ButtonColor="#fff"
          onClickHandler={cancelUpdate}
          outline
          AdditionalClasses="noOutline"
        />
      </div>
    </div>
  );
}

export default AddtoPlaylistMenu;
