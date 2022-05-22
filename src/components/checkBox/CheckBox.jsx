import React from "react";
import "./checkBox.css";

const SearcCheckBox = ({
  setSelectedSearch,
  selectedSearch,
  filterName,
  options,
  labelName,
}) => {
  const handleClick = (e) => {
    setSelectedSearch(!selectedSearch);
  };

  return (
    <div className="check-box">
      <input
        type="checkbox"
        className="check-box-input"
        onClick={handleClick}
      ></input>
      <label className="check-box-label">{labelName}</label>
    </div>
  );
};

export default SearcCheckBox;
