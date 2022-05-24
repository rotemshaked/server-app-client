import React from "react";
import "./checkBox.css";

const SearcCheckBox = ({
  setSelectedSearch,
  selectedSearch,
  labelName,
  setSelectedSearchType,
}) => {
  return (
    <div className="check-box">
      <input
        type="checkbox"
        className="check-box-input"
        onClick={() => {
          setSelectedSearch(!selectedSearch);
          setSelectedSearchType(null);
        }}
      ></input>
      <label className="check-box-label">{labelName}</label>
    </div>
  );
};

export default SearcCheckBox;
