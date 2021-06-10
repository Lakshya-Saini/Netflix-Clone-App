import React from "react";

const Input = (props) => {
  const { type, id, icon, placeholder, query, handleChange } = props;

  return (
    <React.Fragment>
      <div className="form-group input-icons">
        <i className={`fas ${icon} icon`}></i>
        <input
          type={type}
          id={id}
          className="form-control input-field shadow-none"
          placeholder={placeholder}
          autoComplete="off"
          onChange={handleChange}
          value={query}
        />
      </div>
    </React.Fragment>
  );
};

export default Input;
