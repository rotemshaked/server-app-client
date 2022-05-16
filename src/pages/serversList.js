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
import {
  getServersService,
  getTypesService,
  handleDeleteService,
  handleStartService,
  handleStopService,
} from "../services/services";
import { slicedServersToShow } from "../utils/utils";
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
  setCurrencyIsShown,
  input,
  setInput,
  selectedSearchType,
  setSelectedSearchType,
  selectedSearchAmount,
}) => {
  const [page, setPage] = useState(1);
  const [nextPageServers, setNextPageServers] = useState([]);
  const [saveNextPageServers, setSaveNextPageServers] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [serversInLocalStorage, setServersInLocalStorage] = useState([]);
  // const [serverListToShowOnScreen, setServerListToShowOnScreen] =
  // useState(false);

  const getServers = async () => {
    const abortController = new AbortController();
    const servers = await getServersService(page, abortController);
    setServersList(servers.servers);
    setNextPageServers(servers.next);
    // setLocalStorageServers(servers.data.servers, servers.data.next);
  };

  const getServersTypes = async () => {
    const abortController = new AbortController();
    const serversTypes = await getTypesService(abortController);
    setServersTypes(serversTypes);
  };

  // const setLocalStorageServers = (allServers, nextPage) => {
  //   const serversStoresInLocalStorage = JSON.parse(
  //     localStorage.getItem("servers")
  //   );
  //   setServersInLocalStorage(serversStoresInLocalStorage);
  //   if (!serversStoresInLocalStorage) {
  //     const serverListPlusNextPageServers = [...allServers, ...nextPage];
  //     localStorage.setItem(
  //       "servers",
  //       JSON.stringify(serverListPlusNextPageServers)
  //     );
  //     setServersInLocalStorage(serverListPlusNextPageServers);
  //   }
  //   if (saveNextPageServers) {
  //     const newServersListInLocalStorage = [...serversStoresInLocalStorage];
  //     for (let i = 0; i < nextPage.length; i++) {
  //       let existServer = false;
  //       for (let j = 0; j < serversStoresInLocalStorage.length; j++) {
  //         if (serversStoresInLocalStorage[j]._id === nextPage[i]._id) {
  //           existServer = true;
  //           return;
  //         }
  //       }
  //       if (!existServer) {
  //         newServersListInLocalStorage.push(nextPage[i]);
  //       }
  //     }
  //     localStorage.setItem(
  //       "servers",
  //       JSON.stringify(newServersListInLocalStorage)
  //     );
  //     setServersInLocalStorage(newServersListInLocalStorage);
  //   }
  //   setSaveNextPageServers(false);
  // };

  useEffect(() => {
    getServers();
    serversToShow();
    getServersTypes();
    setUpdatedServersList(false);
    setCurrencyIsShown(true);
    setSearchError(false);
  }, [updatedServersList, runningServer, page, currency]);

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const serversTypes = getTypesService(abortController);
  //   setServersTypes(serversTypes);
  // }, []);

  const handleDelete = async (server) => {
    const abortController = new AbortController();
    const deletedSuccessfully = await handleDeleteService(
      server,
      abortController
    );
    if (deletedSuccessfully) setUpdatedServersList(true);
  };

  const handleStart = async (server) => {
    const abortController = new AbortController();
    const start = await handleStartService(server, abortController);
    if (start) setRunningServer(false);
  };

  const handleStop = async (server) => {
    const abortController = new AbortController();
    const stop = await handleStopService(server, abortController);
    if (stop) setRunningServer(true);
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
      if (serverValues.slice().includes(input)) {
        listToShowOnScreen.push(server);
      }
    });
    if (listToShowOnScreen.length > 0) {
      return listToShowOnScreen;
    }
    return false;
  };

  // const slicedServersToShow = (array) => {
  //   const limit = 10;
  //   let endIndex = page;
  //   let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  //   return slicedServers;
  // };

  const showServersBySelectedType = () => {
    let listToShowOnScreen = [];
    serversList.forEach((server) => {
      if (server.type === selectedSearchType) {
        listToShowOnScreen.push(server);
      }
    });
    if (listToShowOnScreen.length > 0) {
      return slicedServersToShow(listToShowOnScreen);
    }
    return false;
  };

  // const showServersBySelectedPrice = () => {
  //   let listToShowOnScreen = [];
  //   serversList.forEach((server) => {
  //     if (server.type === selectedSearchType) {
  //       listToShowOnScreen.push(server);
  //     }
  //   });
  //   if (listToShowOnScreen.length > 0) {
  //     return slicedServersToShow(listToShowOnScreen);
  //   }
  //   return false;
  // };

  const serversToShow = () => {
    let serversToMap =
      showServersBySelectedType() ||
      // showServersBySelectedPrice() ||
      handleSearchInput() ||
      slicedServersToShow(serversList, page);
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
            runningServer={runningServer}
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
            setSelectedSearchType={setSelectedSearchType}
            serversTypes={serversTypes}
            filterName="ALL TYPES"
            options={serversTypes.map((type) => {
              return (
                <option value={type._id} key={type._id}>
                  Type {type.name.toUpperCase()}
                </option>
              );
            })}
          />
          <SearchDropDown
            setSelectedSearch={setSelectedSearchType}
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
