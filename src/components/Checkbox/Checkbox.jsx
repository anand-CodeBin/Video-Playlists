import React from "react";
import "./checkbox.css";

const CheckBox = ({ label, onChangeFunc, checked, extraPropsForCB = null }) => {
	return (
		<div className="CheckBoxHolder">
			<input
				className="box"
				type="checkbox"
				checked={checked}
				onChange={(e) => onChangeFunc(e.target.value, extraPropsForCB)}
			/>
			<label className="labelClass"> {label} </label>
		</div>
	);
};

export default CheckBox;
