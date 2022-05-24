import { useEffect, useState } from "react";
import Server from "../../components/server/server";
import Loader from "../../components/loader/loader";
import Pagination from "../../components/pagination/pagination";
import Search from "../../components/search/serach";
import SearchDropDown from "../../components/searchDropDown/SearchDropDown";
import SearcCheckBox from "../../components/checkBox/CheckBox";
import { getServersService, getTypesService } from "../../services/services";
import { slicedServersToShow, newServersToAddToList } from "../../utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import "./serversList.css";

const ServersListPage = ({
  serversTypes,
  setServersTypes,
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

  const getServers = async () => {
    const abortController = new AbortController();
    const servers = await getServersService(page, abortController);
    const serversAndNextPageServers = [...servers.servers, ...servers.next];
    setServerListToShowOnScreen(servers.servers);
    setNextPageServers(servers.next);
    if (nextPageServers.length > 0) {
      const newServersList = newServersToAddToList(
        serversList,
        serversAndNextPageServers
      );
      // const updatedServers = [...serversList, ...newServersToAdd];
      setServersList([...newServersList]);
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
    if (nextPageServers.length > 0) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedSearch(false);
    setSelectedSearchType(e.target.value);
  };

  const showServersBySelectedDropDown = (selectedSearch) => {
    let listToShowOnScreen = [];
    serversList.forEach((server) => {
      if (server.type === selectedSearch) {
        listToShowOnScreen.push(server);
      }
    });
    if (listToShowOnScreen.length > 0) {
      return slicedServersToShow(listToShowOnScreen);
    }
    return false;
  };

  const showServersByCheckBox = () => {
    let listToShowOnScreen = [];
    if (selectedSearch) {
      serversList.forEach((server) => {
        if (server.isRunning === true) {
          listToShowOnScreen.push(server);
        }
      });
    }
    if (listToShowOnScreen.length > 0) {
      return slicedServersToShow(listToShowOnScreen);
    }
    return false;
  };

  const handleSearchInput = () => {
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
    if (listToShowOnScreen.length > 0) {
      return slicedServersToShow(listToShowOnScreen);
    }
    return false;
  };
  const serversToShow = () => {
    const serversToMap =
      showServersBySelectedDropDown(selectedSearchType) ||
      showServersByCheckBox() ||
      handleSearchInput() ||
      slicedServersToShow(serverListToShowOnScreen);
    // console.log(serversToMap, "***********");
    // console.log(slicedServersToShow(serverListToShowOnScreen), "########");
    // console.log(showServersByCheckBox(), "showServersByCheckBox()");
    // console.log(handleSearchInput(), "handleSearchInput()");
    // console.log(showServersBySelectedDropDown(selectedSearchPrice));
    // console.log(showServersBySelectedDropDown(selectedSearchType));
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
  }, [updatedServersList, sumChange, page, currency, selectedSearch]);

  const getOptions = (fields) => {
    return fields.map((field) => {
      return (
        <option value={field._id} key={field._id}>
          {`${field.name.toUpperCase()} - ${field.pricePerMinute}$ per minute`}
        </option>
      );
    });
  };

  return (
    <div>
      <div className="servers-List-Page">
        <Search setInput={setInput} />
        <div className="search-filter-container">
          <SearchDropDown
            handleChange={handleTypeChange}
            selected="Servers Types"
            options={getOptions(serversTypes, "name")}
          />
          <SearcCheckBox
            labelName="Running Servers"
            selectedSearch={selectedSearch}
            setSelectedSearch={setSelectedSearch}
            setSelectedSearchType={setSelectedSearchType}
          />
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
