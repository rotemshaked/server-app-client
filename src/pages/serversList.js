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
import { getServersService, getTypesService } from "../services/services";
import { slicedServersToShow, updateServersList } from "../utils/utils";
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
  const [searchError, setSearchError] = useState(false);
  const [serverListToShowOnScreen, setServerListToShowOnScreen] = useState([]);
  const [sumChange, setSumChange] = useState(false);

  const getServers = async () => {
    const abortController = new AbortController();
    const servers = await getServersService(page, abortController);
    const serversAndNextPageServers = [...servers.servers, ...servers.next];
    setServerListToShowOnScreen(servers.servers);
    setNextPageServers(servers.next);
    if (nextPageServers.length > 0) {
      const newServers = updateServersList(
        serversList,
        serversAndNextPageServers
      );
      const updatedServers = [...serversList, ...newServers];
      setServersList([...updatedServers]);
    } else {
      setServersList(serversAndNextPageServers);
    }
  };

  const getServersTypes = async () => {
    const abortController = new AbortController();
    const serversTypes = await getTypesService(abortController);
    setServersTypes(serversTypes);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
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
    let serversToMap = showServersBySelectedType() || serverListToShowOnScreen;
    // showServersBySelectedPrice() ||
    // handleSearchInput() ||
    // slicedServersToShow(serverListToShowOnScreen, page);
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
            // handleDelete={handleDelete}
            setUpdatedServersList={setUpdatedServersList}
            setSumChange={setSumChange}
            sumChange={sumChange}
            // handleStop={handleStop}
            // handleStart={handleStart}
            // runningServer={runningServer}
          />
        );
      } else {
        return Error;
      }
    });
  };

  useEffect(() => {
    getServers();
    getServersTypes();
    serversToShow();
    setUpdatedServersList(false);
    setCurrencyIsShown(true);
    setSearchError(false);
  }, [updatedServersList, sumChange, page, currency]);

  return (
    <div>
      <div className="servers-List-Page">
        <Search setInput={setInput} setSearchError={setSearchError} />
        {/* {searchError && errorMessage()} */}
        <div className="search-filter-container">
          <SearchDropDown
            setSelectedSearchType={setSelectedSearchType}
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
            setSelectedSearchType={setSelectedSearchType}
            filterName="Servers Prices"
            options={serversTypes.map((type) => {
              return (
                <option value={type._id} key={type._id}>
                  {type.pricePerMinute}$
                </option>
              );
            })}
          />
          <SearcCheckBox
            labelName="Running Servers"
            setSelectedSearch={setSelectedSearchType}
          />
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
