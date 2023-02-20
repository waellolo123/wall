import React from "react";
import classnames from "classnames";
const InputGroup = ({ label, name, type, placeholder, event, errors }) => {
  return (
    <>
      <label className="register-label">{label}</label>
      <input
        type={type}
        name={name}
        className={classnames("register-input", { "errors-input": errors })}
        placeholder={placeholder}
        onChange={event}
      />
      {errors && <span className="errors-span">{errors}</span>}
    </>
  );
};

export default InputGroup;
