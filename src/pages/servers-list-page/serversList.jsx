import { useEffect, useRef, useState } from "react";
import Server from "../../components/server/server";
import Loader from "../../components/loader/loader";
import Pagination from "../../components/pagination/pagination";
import Search from "../../components/search/serach";
import SearchDropDown from "../../components/searchDropDown/SearchDropDown";
import SearcCheckBox from "../../components/checkBox/CheckBox";
import { getServersService } from "../../services/services";
import { slicedServersToShow, updateNewServersList } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import "./serversList.css";

const ServersListPage = ({
  serversTypes,
  updatedServersList,
  setUpdatedServersList,
  conversionRates,
  currency,
  setCurrencyIsShown,
}) => {
  const [serversList, setServersList] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPageServers, setNextPageServers] = useState([]);
  const [serverListToShowOnScreen, setServerListToShowOnScreen] = useState([]);
  const [sumChange, setSumChange] = useState(false);
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const [selectedSearch, setSelectedSearch] = useState(false);
  const [input, setInput] = useState(null);
  let serversNotFound = useRef(false);
  let showNextPageButton = true;

  const getServers = async () => {
    const abortController = new AbortController();
    const servers = await getServersService(page, abortController);
    const updatedServers = [...servers.servers, ...servers.next];
    setNextPageServers(servers.next);
    setServerListToShowOnScreen(servers.servers);
    if (serversList.length > 0) {
      let updatedList = updateNewServersList(serversList, updatedServers);
      setServersList([...serversList, ...updatedList]);
    } else {
      setServersList([...updatedServers]);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedSearch(false);
    setPage(1);
    setSelectedSearchType(e.target.value);
  };

  const handleNextPage = () => {
    if (nextPageServers.length > 0) {
      setPage(page + 1);
      setServerListToShowOnScreen(nextPageServers);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setServerListToShowOnScreen(slicedServersToShow(serversList, page - 1));
    }
  };

  const getOptions = (serversTypes) => {
    return serversTypes.map((serversType) => {
      return (
        <option value={serversType._id} key={serversType._id}>
          {`${serversType.name.toUpperCase()} - ${
            serversType.pricePerMinute
          }$ per minute`}
        </option>
      );
    });
  };

  const showServersBySelected = (listToShowOnScreen) => {
    if (listToShowOnScreen.length > 0) {
      let serversToShow = slicedServersToShow(listToShowOnScreen, page);
      let serversInNextPage = slicedServersToShow(listToShowOnScreen, page + 1);
      if (serversInNextPage.length > 0) {
        showNextPageButton = true;
      } else {
        showNextPageButton = false;
      }
      console.log("inside input return");
      return serversToShow;
    } else {
      serversNotFound.current = true;
      return slicedServersToShow(serversList);
    }
  };

  const showServersBySelectedDropDown = (selectedSearchType) => {
    if (selectedSearchType !== null && selectedSearchType !== "default") {
      serversNotFound.current = false;
      let listToShowOnScreen = [];
      serversList.forEach((server) => {
        if (selectedSearchType === server.type) {
          listToShowOnScreen.push(server);
        }
      });
      return showServersBySelected(listToShowOnScreen);
    }
    return false;
  };

  const showServersByCheckBox = () => {
    if (selectedSearch) {
      serversNotFound.current = false;
      let listToShowOnScreen = [];
      serversList.forEach((server) => {
        if (server.isRunning === true) {
          listToShowOnScreen.push(server);
        }
      });
      return showServersBySelected(listToShowOnScreen);
    }
    return false;
  };

  const handleSearchInput = () => {
    if (input) {
      let listToShowOnScreen = [];
      serversList.filter((server) => {
        if (input === "") {
          return false;
        } else if (
          server.name.toLowerCase().includes(input) ||
          server.ipAddress.includes(input)
        ) {
          listToShowOnScreen.push(server);
        }
      });
      return showServersBySelected(listToShowOnScreen);
    }
    return false;
  };

  const serversToShowOnTheScreen = () => {
    serversNotFound.current = false;
    if (nextPageServers.length > 0) {
      showNextPageButton = true;
    } else {
      showNextPageButton = false;
    }
    return slicedServersToShow(serverListToShowOnScreen);
  };

  const serversToShow = () => {
    const serversToMap =
      showServersBySelectedDropDown(selectedSearchType) ||
      showServersByCheckBox() ||
      handleSearchInput() ||
      serversToShowOnTheScreen();
    console.log(handleSearchInput(), "servers map");
    console.log(serversNotFound.current, "out");

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
            setUpdatedServersList={setUpdatedServersList}
            setSumChange={setSumChange}
            sumChange={sumChange}
            setServersList={setServersList}
            serversList={serversList}
          />
        );
      } else {
        return Error;
      }
    });
  };
  useEffect(() => {
    getServers();
    serversToShow();
    setUpdatedServersList(false);
    setCurrencyIsShown(true);
  }, [updatedServersList, sumChange, page, currency, selectedSearch, input]);

  return (
    <div>
      <div className="servers-List-Page">
        <Search setInput={setInput} />
        <div className="search-filter-container">
          <SearchDropDown
            handleChange={handleTypeChange}
            selected="Servers Types"
            options={getOptions(serversTypes)}
          />
          <SearcCheckBox
            labelName="Running Servers"
            selectedSearch={selectedSearch}
            setSelectedSearch={setSelectedSearch}
            setSelectedSearchType={setSelectedSearchType}
            setPage={setPage}
          />
        </div>
        <div
          className={
            serversNotFound.current ? "error-finding-server" : "hidden"
          }
        >
          No server matching the requirement was found :&#40;
        </div>
        <div className="serversContiner">
          {!serversList.length > 0 || !(serversTypes.length > 0) ? (
            <div className="load">
              Loading...
              <Loader />
            </div>
          ) : (
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
          )}
        </div>
        <Pagination
          showNextPageButton={showNextPageButton}
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
