import React from "react";

const ErrorMessage = (props) => {
  const { message } = props;

  return (
    <React.Fragment>
      <div className="form-group error-message">
        <p className="text-warning">{message}</p>
      </div>
    </React.Fragment>
  );
};

export default ErrorMessage;
