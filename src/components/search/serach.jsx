import "./search.css";

const Search = ({ setInput }) => {
  return (
    <div className="search-div">
      <input
        className="serach-input"
        placeholder="Find server"
        onChange={(e) => setInput(e.target.value.toLowerCase())}
      ></input>
    </div>
  );
};

export default Search;
