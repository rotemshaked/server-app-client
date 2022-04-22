import React from "react";
import "./checkBox.css";

const SearcCheckBox = ({ setSelectedSearch, filterName, options }) => {
  const handleChange = (e) => {
    setSelectedSearch(e.target.value);
  };

  return (
    <div>
      <input type="checkbox" id="checkBox"></input>
      <label htmlFor="checkBox" className=""></label>
    </div>
  );
};

export default SearcCheckBox;
