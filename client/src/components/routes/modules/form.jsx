import React from "react";
import Input from "./input";

const Form = (props) => {
  const { searchQuery, handleChange, handleSubmit } = props;

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="search-input"
          placeholder="Search for Movie or TV Series"
          query={searchQuery}
          handleChange={handleChange}
          icon="fa-search"
        />
      </form>
    </div>
  );
};

export default Form;
