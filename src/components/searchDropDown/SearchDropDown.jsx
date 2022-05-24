import "./SearchDropDown.css";

const SearchDropDown = ({ handleChange, selected, options }) => {
  return (
    <div>
      <select
        name="type"
        className="search-filter-select"
        onChange={handleChange}
      >
        <option>{selected}</option>
        {options}
      </select>
    </div>
  );
};

export default SearchDropDown;
