import { useEffect, useState } from "react";
import axios from "axios";
import Server from "../components/server/server";
import Loader from "../components/loader/loader";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/serach";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import SearchDropDown from "../components/searchDropDown/SearchDropDown";
import SearcCheckBox from "../components/checkBox/CheckBox";
import "../assets/styles.css";

const ServersListPage = ({
  serversList,
  setServersList,
  serversTypes,
  setServersTypes,
  updatedServersList,
  setUpdatedServersList,
  runningServer,
  setRunningServer,
  conversionRates,
  currency,
  setShowChangeCurrency,
  input,
  setInput,
  selectedSearch,
  setSelectedSearch,
}) => {
  const [page, setPage] = useState(1);
  const [nextPageServers, setNextPageServers] = useState([]);
  const [saveNextPageServers, setSaveNextPageServers] = useState(false);
  const [searchError, setSearchError] = useState(false);
  // const [serverListToShowOnScreen, setServerListToShowOnScreen] =
  useState(false);

  const getServers = async () => {
    const abortController = new AbortController();
    try {
      const allServers = await axios.get(
        "https://server-app-server.herokuapp.com/servers",
        { params: { page: page } },
        { signal: abortController.signal }
      );
      setServersList(allServers.data.servers);
      setNextPageServers(allServers.data.next);
      setLocalStorageServers(allServers.data.servers, allServers.data.next);
    } catch (error) {
      if (error.name === "AbortError") return;
      throw error;
    }
    return () => {
      console.log("abort servers");
      abortController.abort();
    };
  };

  const setLocalStorageServers = (allServers, nextPage) => {
    const serversStoresInLocalStorage = JSON.parse(
      localStorage.getItem("servers")
    );
    if (!serversStoresInLocalStorage) {
      const serverListPlusNextPageServers = [...allServers, ...nextPage];
      localStorage.setItem(
        "servers",
        JSON.stringify(serverListPlusNextPageServers)
      );
    }
    if (saveNextPageServers) {
      localStorage.clear();
      console.log(...serversStoresInLocalStorage);
      // const uniqueServers = Object.keys(...serversStoresInLocalStorage).forEach(
      //   (key) => {
      //     return serversStoresInLocalStorage[key] === nextPage[key];
      //   }
      // );
      console.log(serversStoresInLocalStorage);
      console.log(nextPage);
      // localStorage.setItem("servers", JSON.stringify(uniqueServers));
    }
    setSaveNextPageServers(false);
  };

  // const b = { a: "1", b: "2", c: "3" };
  // const a = new Set();
  // a.add({ a: "1", b: "2", c: "3" });
  // a.add(b);
  // console.log(a.has(b));

  useEffect(() => {
    getServers(page);
    setUpdatedServersList(false);
    setShowChangeCurrency(true);
    setSearchError(false);
  }, [updatedServersList, runningServer, page, currency]);

  useEffect(() => {
    const abortController = new AbortController();
    const getTypes = async () => {
      try {
        const allTypes = await axios.get(
          "https://server-app-server.herokuapp.com/types",
          { signal: abortController.signal }
        );
        setServersTypes(allTypes.data);
      } catch (error) {
        if (error.name === "AbortError") return;
        throw error;
      }
    };
    getTypes();
    return () => {
      console.log("abort types");
      abortController.abort();
    };
  }, []);

  const handleDelete = async (server) => {
    try {
      axios
        .delete("https://server-app-server.herokuapp.com/servers", {
          data: { _id: server._id },
        })
        .then(() => {
          setUpdatedServersList(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleStart = async (server) => {
    setRunningServer(false);
    try {
      if (!server.isRunning) {
        await axios.put("https://server-app-server.herokuapp.com/servers", {
          _id: server._id,
        });
        setRunningServer(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStop = async (server) => {
    setRunningServer(true);
    try {
      if (server.isRunning) {
        await axios.put("https://server-app-server.herokuapp.com/servers", {
          _id: server._id,
        });
        setRunningServer(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
    setSaveNextPageServers(true);
    getServers();
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      getServers();
    }
  };

  const handleSearchInput = () => {
    let listToShowOnScreen = [];
    serversList.forEach((server) => {
      let serverValues = Object.values(server);
      if (serverValues.includes(input)) {
        listToShowOnScreen.push(server);
      }
    });
    if (listToShowOnScreen.length > 0) {
      return listToShowOnScreen;
    }
    return;
  };

  const showServersBySelectedType = () => {
    let listToShowOnScreen = [];
    serversList.forEach((server) => {
      if (server.type === selectedSearch) {
        listToShowOnScreen.push(server);
      }
    });
    if (listToShowOnScreen.length > 0) {
      return listToShowOnScreen;
    }
    return;
  };

  const serversToShow = () => {
    let serversToMap = [];
    serversToMap =
      showServersBySelectedType() || handleSearchInput() || serversList;
    return serversToMap.map((server) => {
      let typeId = serversTypes.find((type) => {
        return type._id === server.type;
      });
      if (!server.deleted) {
        return (
          <Server
            key={server._id}
            server={server}
            serverType={typeId}
            conversionRates={conversionRates}
            currency={currency}
            handleDelete={handleDelete}
            handleStop={handleStop}
            handleStart={handleStart}
          />
        );
      } else {
        return Error;
      }
    });
  };

  // const errorMessage = () => {
  //   return (
  //     <div className="error-message">
  //       Couldn't find server that match your search :(
  //     </div>
  //   );
  // };

  return (
    <div>
      <div className="servers-List-Page">
        <Search setInput={setInput} setSearchError={setSearchError} />
        {/* {searchError && errorMessage()} */}
        <div className="search-filter-container">
          <SearchDropDown
            setSelectedSearch={setSelectedSearch}
            serversTypes={serversTypes}
            filterName="Servers Types"
            options={serversTypes.map((type) => {
              return (
                <option value={type._id} key={type._id}>
                  {type.name.toUpperCase()}
                </option>
              );
            })}
          />
          <SearchDropDown
            setSelectedSearch={setSelectedSearch}
            serversTypes={serversTypes}
            filterName="Servers Prices"
            options={serversTypes.map((type) => {
              return (
                <option value={type._id} key={type._id}>
                  {type.pricePerMinute}$
                </option>
              );
            })}
          />
          <SearcCheckBox />
        </div>
        <div className="serversContiner">
          {!serversList.length > 0 || !(serversTypes.length > 0) ? (
            <div className="load">
              Loading...
              <Loader />
            </div>
          ) : (
            <div className="servers">
              <table className="servers-table">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>IP address</th>
                    <th>Type</th>
                    <th>Price per minute</th>
                    <th>Server is running</th>
                    <th>Sum to pay</th>
                    <th> {<FontAwesomeIcon icon={faPlay} />}</th>
                    <th>{<FontAwesomeIcon icon={faStop} />}</th>
                    <th>
                      <FontAwesomeIcon icon={faTrash} />
                    </th>
                  </tr>
                  {serversToShow()}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <Pagination
          page={page}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          nextPage={nextPageServers}
        />
      </div>
    </div>
  );
};
export default ServersListPage;
