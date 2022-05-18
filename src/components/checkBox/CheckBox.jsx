import React from "react";
import "./checkBox.css";

const SearcCheckBox = ({
  setSelectedSearch,
  filterName,
  options,
  labelName,
}) => {
  const handleClick = (e) => {
    setSelectedSearch(e.target);
  };

  return (
    <div className="check-box">
      <input
        type="checkbox"
        className="check-box-input"
        onClick={handleClick}
      ></input>
      <label htmlFor="checkBox" className="check-box-label">
        {labelName}
      </label>
    </div>
  );
};

export default SearcCheckBox;
