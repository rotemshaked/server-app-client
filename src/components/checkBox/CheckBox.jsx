import React from "react";
import "./checkBox.css";

const SearcCheckBox = ({
  setSelectedSearch,
  selectedSearch,
  labelName,
  setSelectedSearchType,
  setSelectedSearchPrice,
}) => {
  const handleClick = (e) => {
    setSelectedSearch(!selectedSearch);
    setSelectedSearchType("");
    setSelectedSearchPrice("");
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
