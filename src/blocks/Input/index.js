import React from "react"

export const Input = ({label, name, onBlur, onChange, error, value, ...props}) => {
  return (
    <div className="input-container">
      <label htmlFor={name} className="login-form__label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="login-form__input"
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        {...props}
      />
      {error && <span className="login-form__error">{error}</span>}
    </div>
  );
};
