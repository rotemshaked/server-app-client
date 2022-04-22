import "./SearchFilter.css";

const SearchFilter = ({ serversTypes, filterName, options, handleChange }) => {
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

export default SearchFilter;
