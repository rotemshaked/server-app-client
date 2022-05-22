import "./SearchDropDown.css";

const SearchDropDown = ({ handleChange, filterName, options }) => {
  return (
    <div className="search-filter-div">
      <select
        id="type"
        name="type"
        className="search-filter-select"
        onChange={handleChange}
      >
        <option>{filterName}</option>
        {options}
      </select>
    </div>
  );
};

export default SearchDropDown;
