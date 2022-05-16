import React from "react";
import "./checkbox.css";

const CheckBox = ({ label, onChangeFunc, checked, extraPropsForCB = null }) => {
	return (
		<>
			<input
				className="box"
				type="checkbox"
				checked={checked}
				onChange={(e) => onChangeFunc(e.target.value, extraPropsForCB)}
			/>
			<label className="labelClass"> {label} </label>
		</>
	);
};

export default CheckBox;
