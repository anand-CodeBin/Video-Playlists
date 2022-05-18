import React, { useEffect, useState } from "react";
import TextInput from "../../components/TextInput/TextInput";
import CodebinLogo from "../../assets/logo/codebin.png";
import CheckBox from "../../components/Checkbox/Checkbox";
import Button from "../../components/Button/Button";
import "./Loginpage.css";
import { rememberMe, signIn } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
	const [inputEmail, setInputEmail] = useState("");
	const [inputPass, setInputPass] = useState("");
	const [wrongCredentials, updateWrongCredentials] = useState(false);
	const [invalidMail, updateInvalidMail] = useState(false);
	const [invalidPassword, updateinvalidPassword] = useState(false);
	const [signInBtnEnabled, togglesignInBtnEnabled] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isLoggedIn = useSelector((state) => state.rootReducer.auth.signedIn);
	const rememberMeValue = useSelector(
		(state) => state.rootReducer.auth.rememberMe
	);
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	const validatePass = (pass) => {
		return String(pass).match(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
		);
	};
	const onChangeEmail = (value) => {
		setInputEmail(value);
		if (validateEmail(value) == null) {
			updateInvalidMail(true);
		} else {
			updateInvalidMail(false);
		}
	};
	const onChangePass = (value) => {
		if (validatePass(value) === null || inputPass === "") {
			updateinvalidPassword(true);
		} else {
			updateinvalidPassword(false);
		}
		setInputPass(value);
	};
	const onChangeOfRememberMe = (value) => {
		console.log(value);
		dispatch(rememberMe(value));
	};
	const signInHandle = () => {
		if (
			inputPass === "Password1!" &&
			inputEmail !== "" &&
			invalidMail === false
		) {
			dispatch(signIn(inputEmail));
		} else {
			updateWrongCredentials(true);
		}
	};
	const handleEnterKey = (e) => {
		if (e.key === "Enter") {
			signInHandle();
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("loginMail");
		if (token !== null) {
			setInputEmail(token);
		}
		const loggedInAs = localStorage.getItem("logged_in_as");
		if (loggedInAs !== null) {
			dispatch(signIn(inputEmail));
		}
	}, [dispatch, navigate]);

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/home");
		}
	}, [isLoggedIn, navigate]);

	useEffect(() => {
		if (
			!invalidPassword &&
			inputEmail !== "" &&
			!invalidMail &&
			!invalidPassword &&
			inputPass !== ""
		) {
			togglesignInBtnEnabled(false);
		} else {
			togglesignInBtnEnabled(true);
		}
	}, [inputEmail, inputPass]);

	return (
		<div className="bodyDiv" onKeyDown={(e) => handleEnterKey(e)}>
			<div className="mainHolderDiv">
				<img src={CodebinLogo} alt="" className="logo" />
				<TextInput
					placeholder="Email"
					icon={<FontAwesomeIcon icon={faEnvelope} className="loginPageIcon" />}
					value={inputEmail}
					onChangeFunc={onChangeEmail}
					onKeyPressFunc={handleEnterKey}
					autoFocus={true}
				/>
				{invalidMail ? (
					<div className="errMsgBelowInput ">
						<p style={{ margin: 0 }}>Invalid Email</p>
					</div>
				) : (
					<div className="errMsgBelowInput"></div>
				)}
				<TextInput
					placeholder="Password"
					icon={<FontAwesomeIcon icon={faLock} className="loginPageIcon" />}
					isPassword={true}
					value={inputPass}
					onChangeFunc={onChangePass}
					onKeyPressFunc={handleEnterKey}
				/>
				{invalidPassword ? (
					<div className="errMsgBelowInput">
						<p style={{ margin: 0 }}>
							Password must contain 8 characters, 1 uppercase, 1 lowercase and 1
							special character
						</p>
					</div>
				) : (
					<div className="errMsgBelowInput"></div>
				)}
				<div className="RememberMeHolder">
					<CheckBox
						checked={rememberMeValue}
						label="Remember Me"
						onChangeFunc={onChangeOfRememberMe}
					/>
				</div>
				<br />
				<Button
					onClickHandler={signInHandle}
					Text="Sign in"
					ButtonColor={signInBtnEnabled ? "#e5e5e5" : "#EA3946"}
					TextColor={signInBtnEnabled ? "#000" : "#fff"}
				/>

				{wrongCredentials ? (
					<div className="warningHolder ">
						<p className="wrongCreds">Wrong credentials</p>
						<p className="invalidUser">Invalid username or password</p>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default LoginPage;
