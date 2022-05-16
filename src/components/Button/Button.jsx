import React from "react";
import "./button.css";

const Button = ({
	Text = "Button",
	ButtonColor = "#ffffff",
	TextColor = "#000000",
	onClickHandler,
	outline = false,
	AdditionalClasses,
}) => {
	const styles = {
		backgroundColor: ButtonColor,
		color: TextColor,
	};
	return (
		<>
			<button
				className={"buttonClass " + AdditionalClasses}
				style={styles}
				onClick={onClickHandler}
			>
				{Text}
			</button>
		</>
	);
};

export default Button;
