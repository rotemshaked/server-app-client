import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search.css";
import { useState } from "react";

const Search = ({ servers }) => {
  const [input, setInput] = useState("");

  const handleInput = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  //   const getServers = async () => {
  //     const abortController = new AbortController();
  //     try {
  //       const allServers = await axios.get(
  //         "https://server-app-server.herokuapp.com/servers",
  //         { params: { page: page } },
  //         { signal: abortController.signal }
  //       );
  //       setServers(allServers.data.servers);
  //       setNextServers(allServers.data.next);
  //       console.log(allServers.data.next);
  //     } catch (error) {
  //       if (error.name === "AbortError") return;
  //       throw error;
  //     }
  //     return () => {
  //       console.log("abort servers");
  //       abortController.abort();
  //     };
  //   };

  const handleClick = (input) => {
    const matchingServers = servers.filter((server) => {
      // console.log(server.name.toLowerCase());
      console.log(server.name === input);
      return server.name === input;
    });
    console.log(matchingServers);
    // return matchingServers.forEach((server) => {
    //   <div>{server.name}</div>;
    // });
  };

  return (
    <div className="search-div">
      <input
        className="serach-input"
        placeholder="Find server"
        onChange={handleInput}
      ></input>
      <button
        className="search-btn"
        onClick={() => {
          handleClick(input);
        }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Search;
