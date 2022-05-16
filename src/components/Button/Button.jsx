import React from "react";
import "./button.css";

const Button = ({
	Text = "Button",
	ButtonColor = "#ffffff",
	TextColor = "#000000",
	onClickHandler,
}) => {
	const styles = {
		backgroundColor: ButtonColor,
		color: TextColor,
	};
	return (
		<>
			<button className="buttonClass" style={styles} onClick={onClickHandler}>
				{Text}
			</button>
		</>
	);
};

export default Button;
