import React, { useState } from "react";
import "./TextInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const TextInput = ({
	placeholder,
	icon = null,
	isPassword = false,
	value = "",
	onChangeFunc = () => {},
	Inputstyles,
	onKeyPressFunc = () => {},
	autoFocus = false,
}) => {
	const [isPasswordVisible, toggleVisibility] = useState(!isPassword);

	return (
		<>
			<div className="mainHolder">
				{icon}
				<p>{isPasswordVisible}</p>
				<input
					autoFocus={autoFocus}
					style={Inputstyles}
					className="textInput"
					type={isPasswordVisible ? "text" : "password"}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						onChangeFunc(e.target.value);
					}}
					onKeyDown={(e) => onKeyPressFunc(e)}
				/>
				{isPassword ? (
					<FontAwesomeIcon
						icon={isPasswordVisible ? faEye : faEyeSlash}
						onClick={() => toggleVisibility(!isPasswordVisible)}
						className="eye"
					/>
				) : null}
			</div>
		</>
	);
};

export default TextInput;
