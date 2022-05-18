import React, { useState } from "react";
import "./checkbox.css";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const CheckBox = ({ label, onChangeFunc, checked, extraPropsForCB = null }) => {
	const [isChecked, toggleisChecked] = useState(checked);
	const handleChange = () => {
		toggleisChecked(!isChecked);
		onChangeFunc(isChecked, extraPropsForCB);
	};
	return (
		<Form onClick={() => handleChange()}>
			<Form.Check
				label={label}
				type="checkbox"
				checked={checked}
				value={checked}
				onChange={() => {}}
			/>
		</Form>
	);
};

CheckBox.propTypes = {
	label : PropTypes.string.isRequired,
	onChangeFunc : PropTypes.func.isRequired, 
	checked : PropTypes.bool.isRequired, 
	extraPropsForCB : PropTypes.number
};
CheckBox.defaultProps = {
	extraPropsForCB : 0
}

export default CheckBox;
