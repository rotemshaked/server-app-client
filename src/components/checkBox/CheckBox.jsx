import React from "react";
import "./checkBox.css";

const SearcCheckBox = ({ setSelectedSearch, filterName, options }) => {
  const handleChange = (e) => {
    setSelectedSearch(e.target.value);
  };

  return (
    <React.Fragment>
      <input type="checkbox" id="checkBox"></input>
      <label htmlFor="checkBox"></label>
    </React.Fragment>
  );
};

export default SearcCheckBox;
