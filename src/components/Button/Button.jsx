import React from "react";
import "./button.css";
import { Button as Btn } from "react-bootstrap";
import PropTypes from "prop-types";

const Button = ({
	text = "Button",
	ButtonColor = "#ffffff",
	TextColor = "#000000",
	onClickHandler,
	AdditionalClasses,
}) => {
	const styles = {
		backgroundColor: ButtonColor,
		color: TextColor,
	};
	return (
		<Btn
			style={styles}
			size="lg"
			className={`buttonClass ${AdditionalClasses}`}
			onClick={onClickHandler}
		>
			{text}
		</Btn>
	);
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	ButtonColor: PropTypes.string,
	TextColor: PropTypes.string,
	onClickHandler: PropTypes.func.isRequired,
	AdditionalClasses: PropTypes.string,
};

Button.defaultProps = {
	ButtonColor: "#ffffff",
	TextColor: "#000000",
	AdditionalClasses: "",
};

export default Button;
