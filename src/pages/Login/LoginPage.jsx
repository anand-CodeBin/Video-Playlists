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
	const onChangeEmail = (value) => {
		setInputEmail(value);
		if (validateEmail(value) == null) {
			updateInvalidMail(true);
		} else {
			updateInvalidMail(false);
		}
	};
	const onChangePass = (value) => {
		setInputPass(value);
	};
	const onChangeOfRememberMe = (value) => {
		dispatch(rememberMe(value));
	};
	const signInHandle = () => {
		if (inputPass === "123" && inputEmail !== "" && invalidMail === false) {
			dispatch(signIn(inputEmail));
		} else {
			updateWrongCredentials(true);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem("loginMail");
		if (token !== null) {
			setInputEmail(token);
		}
	}, [dispatch, navigate]);

	useEffect(() => {
		if (isLoggedIn) {
			navigate("/home");
		}
	}, [isLoggedIn, navigate]);

	return (
		<>
			<div className="bodyDiv">
				<div className="mainHolderDiv">
					<img src={CodebinLogo} alt="" className="logo" />
					<TextInput
						placeholder="Email"
						icon={
							<FontAwesomeIcon icon={faEnvelope} className="loginPageIcon" />
						}
						value={inputEmail}
						onChangeFunc={onChangeEmail}
					/>
					<TextInput
						placeholder="Password"
						icon={<FontAwesomeIcon icon={faLock} className="loginPageIcon" />}
						isPassword={true}
						value={inputPass}
						onChangeFunc={onChangePass}
					/>
					<CheckBox
						checked={rememberMeValue}
						label="Remember Me"
						onChangeFunc={onChangeOfRememberMe}
					/>
					<br />
					<Button
						onClickHandler={signInHandle}
						Text="Sign in"
						ButtonColor="#EA3946"
						TextColor="#fff"
					/>
					{invalidMail ? <p>Invalid Email</p> : null}
					{wrongCredentials ? (
						<div className="warningHolder">
							<p className="wrongCreds">Wrong credentials</p>
							<p className="invalidUser">Invalid username or password</p>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
};

export default LoginPage;
