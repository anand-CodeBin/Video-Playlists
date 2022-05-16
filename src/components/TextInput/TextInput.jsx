import React, { useState } from "react";
import "./TextInput.css";
import eyeIcon from "../../assets/icons/eye.png";

const TextInput = ({
	placeholder,
	iconSrc = "",
	isPassword = false,
	value = "",
	onChangeFunc,
	Inputstyles,
}) => {
	const [isPasswordVisible, toggleVisibility] = useState(!isPassword);

	return (
		<>
			<div className="mainHolder">
				{iconSrc !== "" ? <img src={iconSrc} className="icon" alt="" /> : null}
				<p>{isPasswordVisible}</p>
				<input
					style={Inputstyles}
					className="textInput"
					type={isPasswordVisible ? "text" : "password"}
					placeholder={placeholder}
					value={value}
					onChange={(e) => {
						onChangeFunc(e.target.value);
					}}
				/>
				{isPassword ? (
					<img
						src={eyeIcon}
						className="eye"
						alt=""
						onClick={() => toggleVisibility(!isPasswordVisible)}
					/>
				) : null}
			</div>
		</>
	);
};

export default TextInput;
