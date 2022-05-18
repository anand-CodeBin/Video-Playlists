import React, { useState } from 'react';
import './TextInput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

function TextInput({
  placeholder,
  icon = null,
  isPassword = false,
  onChangeFunc = () => {},
  onKeyPressFunc = () => {},
  autoFocus = false,
}) {
  const [isPasswordVisible, toggleVisibility] = useState(!isPassword);

  return (
  	<div className="mainHolder">
      {icon}
      <p>{isPasswordVisible}</p>
      <Form.Control
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          onChangeFunc(e.target.value);
        }}
        autoFocus={autoFocus}
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
  );
}

TextInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  icon: PropTypes.element,
  isPassword: PropTypes.bool,
  onChangeFunc: PropTypes.func,
  onKeyPressFunc: PropTypes.func,
  autoFocus: PropTypes.bool,
};

TextInput.defaultProps = {
  icon: null,
  isPassword: false,
  onChangeFunc: () => {},
  onKeyPressFunc: () => {},
  autoFocus: false,
};

export default TextInput;
