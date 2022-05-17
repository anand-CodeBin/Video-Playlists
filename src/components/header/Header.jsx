import React from "react";
import "./header.css";
import CodebinLogo from "../../assets/logo/codebin.png";
import logoutIcon from "../../assets/icons/logout.png";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/slices/authSlice";
import { clearPlaylists } from "../../redux/slices/playlistSlice";

const Header = () => {
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(clearPlaylists());
		dispatch(signOut());
	};

	return (
		<>
			<div className="headerDiv">
				<img src={CodebinLogo} alt="CodeBinLogo" className="Headerlogo" />
				{/* <img
					src={logoutIcon}
					alt="Log Out"
					className="Headerlogout"
					onClick={(e) => handleLogOut()}
				/> */}
				<button
					className="Headerlogout"
					onClick={(e) => handleLogOut()}
					style={{ background: `url("${logoutIcon}")` }}
				></button>
			</div>
		</>
	);
};

export default Header;
