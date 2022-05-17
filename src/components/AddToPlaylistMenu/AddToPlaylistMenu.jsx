import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addToPlaylist,
	updateMenuState,
	createPlaylist,
	confirmUpdatePlaylists,
	cancelUpdatePlaylists,
} from "../../redux/slices/playlistSlice";
import Button from "../Button/Button";
import CheckBox from "../Checkbox/Checkbox";
import TextInput from "../TextInput/TextInput";
import "./PlaylistMenu.css";

const AddtoPlaylistMenu = (title = "") => {
	const dispatch = useDispatch();
	const [newPlaylistTitle, setnewPlaylistTitle] = useState("");
	const [newplaylistSelected, toggleNewplaylistSelected] = useState(false);
	const menuState = useSelector(
		(state) => state.rootReducer.playlists.playlistMenuState
	);

	const playlistsData = useSelector((state) => {
		return {
			playlists: state.rootReducer.playlists.playlists,
			menuState: state.rootReducer.playlists.playlistMenuState,
		};
	});

	const addToPlaylistHandle = (checkboxValue, index) => {
		dispatch(
			addToPlaylist({
				index: index,
			})
		);
	};

	const closeMenu = () => {
		dispatch(
			updateMenuState({
				visible: false,
			})
		);
	};

	const createplaylist = () => {
		if (newPlaylistTitle !== "") {
			toggleNewplaylistSelected(false);
			dispatch(
				createPlaylist({
					title: newPlaylistTitle,
				})
			);
		}
	};

	const confirmUpdate = () => {
		dispatch(confirmUpdatePlaylists());
		closeMenu();
	};
	const cancelUpdate = () => {
		dispatch(cancelUpdatePlaylists());
		closeMenu();
	};

	if (!menuState.visible || menuState.videoInProcess == null) return null;
	return (
		<div className="menuParent">
			<div className="MenuHolder">
				<h1>{menuState.videoInProcess.title} </h1>
				<div className="playlistOptionsHolder">
					{playlistsData.playlists.map((data, index) => {
						return (
							<div className="playlistOption" key={index + data.title}>
								<CheckBox
									label={data.title}
									onChangeFunc={addToPlaylistHandle}
									extraPropsForCB={index}
								/>
							</div>
						);
					})}
				</div>

				{newplaylistSelected ? (
					<>
						<div className="createPlaylistInputHolder">
							<TextInput
								Inputstyles={{
									borderBottom: "2px solid black",
									outlineColor: "red",
								}}
								placeholder={"Title"}
								value={newPlaylistTitle}
								onChangeFunc={setnewPlaylistTitle}
							/>
							<Button
								Text="Create Playlist"
								TextColor="#fff"
								ButtonColor="#EA3946"
								onClickHandler={createplaylist}
							/>
						</div>
					</>
				) : (
					<p
						className="createplaylistOption"
						onClick={(e) => toggleNewplaylistSelected(true)}
					>
						+ Create Playlist
					</p>
				)}

				<Button
					Text="Done"
					TextColor="#fff"
					ButtonColor="#EA3946"
					onClickHandler={confirmUpdate}
				/>
				<Button
					Text="Cancel"
					TextColor="#838383"
					ButtonColor="#fff"
					onClickHandler={cancelUpdate}
					outline={true}
					AdditionalClasses={"noOutline"}
				/>
			</div>
		</div>
	);
};

export default AddtoPlaylistMenu;
