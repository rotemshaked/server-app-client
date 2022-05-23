import "./search.css";

const Search = ({ setInput }) => {
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search-div">
      <input
        type="search"
        className="serach-input"
        placeholder="Find server"
        onChange={handleInput}
      ></input>
    </div>
  );
};

export default Search;
