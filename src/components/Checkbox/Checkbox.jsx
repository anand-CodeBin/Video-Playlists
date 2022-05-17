import React, { useState } from "react";
import "./checkbox.css";

const CheckBox = ({ label, onChangeFunc, checked, extraPropsForCB = null }) => {
	const [isChecked, toggleisChecked] = useState(checked);
	const handleChange = () => {
		toggleisChecked(!isChecked);
		onChangeFunc(isChecked, extraPropsForCB);
	};
	return (
		<div className="CheckBoxHolder">
			<input
				className="box"
				type="checkbox"
				checked={checked}
				onChange={(e) => handleChange()}
			/>
			<label className="labelClass" onClick={() => handleChange()}>
				{label}
			</label>
		</div>
	);
};

export default CheckBox;
