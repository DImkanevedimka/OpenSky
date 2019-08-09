import React from "react";
import "./index.css";

export const Input = ({
  label,
  name,
  onBlur,
  onChange,
  error,
  value,
  ...props
}) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="input"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        {...props}
      />
      {error && <span className="input__error">{error}</span>}
    </div>
  );
};
