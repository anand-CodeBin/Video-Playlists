import React from 'react';
import './header.css';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import CodebinLogo from '../../assets/logo/codebin.png';
import logoutIcon from '../../assets/icons/logout.png';
import { signOut } from '../../redux/slices/authSlice';
import { clearPlaylists } from '../../redux/slices/playlistSlice';

function Header() {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(clearPlaylists());
    dispatch(signOut());
  };

  return (
  	<div className="headerDiv">
      <img src={CodebinLogo} alt="CodeBinLogo" className="Headerlogo" />
      <Button
        className="Headerlogout"
        onClick={() => handleLogOut()}
        style={{ background: `url("${logoutIcon}")` }}
      />
    </div>
  );
}

export default Header;
