import React from "react";

const Button = (props) => {
  const { type, id, value } = props;

  return (
    <React.Fragment>
      <div className="form-group mb-0">
        <button type={type} id={id} className="btn btn-block shadow-none">
          {value}
        </button>
      </div>
    </React.Fragment>
  );
};

export default Button;
