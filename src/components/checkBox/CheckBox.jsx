import React from "react";
import "./checkBox.css";

const SearcCheckBox = ({
  setSelectedSearch,
  selectedSearch,
  labelName,
  setSelectedSearchType,
  setPage,
}) => {
  return (
    <div className="check-box">
      <input
        type="checkbox"
        className="check-box-input"
        onClick={() => {
          setSelectedSearch(!selectedSearch);
          setSelectedSearchType(null);
          setPage(1);
        }}
      ></input>
      <label className="check-box-label">{labelName}</label>
    </div>
  );
};

export default SearcCheckBox;
