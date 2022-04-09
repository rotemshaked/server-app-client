import { useEffect, useState } from "react";
import axios from "axios";
import Server from "../components/server/server";
import Loader from "../components/loader/loader";
import Pagination from "../components/pagination/pagination";
import Search from "../components/search/serach";

import "../assets/styles.css";

const ServersListPage = ({
  running,
  setRunning,
  servers,
  types,
  setTypes,
  created,
  setCreated,
  conversionRates,
  setConversionRates,
  setServers,
  sumToPay,
  setSumToPay,
  currency,
  setCurrency,
  setOnServersPage,
}) => {
  // const [currency, setCurrency] = useState("USD");
  // const [sumToPay, setSumToPay] = useState("server.sumToPay");
  const [page, setPage] = useState(1);
  const [nextServers, setNextServers] = useState([]);

  useEffect(() => {
    setCreated(false);
    setOnServersPage(true);
  }, []);
  console.log("cuuuu", currency);
  const getServers = async () => {
    const abortController = new AbortController();
    try {
      const allServers = await axios.get(
        "https://server-app-server.herokuapp.com/servers",
        { params: { page: page } },
        { signal: abortController.signal }
      );
      setServers(allServers.data.servers);
      setNextServers(allServers.data.next);
      console.log(allServers.data.next);
    } catch (error) {
      if (error.name === "AbortError") return;
      throw error;
    }
    return () => {
      console.log("abort servers");
      abortController.abort();
    };
  };

  useEffect(() => {
    getServers();
  }, [created, running, page, currency]);

  useEffect(() => {
    const abortController = new AbortController();
    const getTypes = async () => {
      try {
        const allTypes = await axios.get(
          // "http://localhost:8080/types",
          "https://server-app-server.herokuapp.com/types",
          { signal: abortController.signal }
        );
        setTypes(allTypes.data);
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

  // useEffect(() => {
  //   const abortController = new AbortController();
  //   try {
  //     axios
  //       .get(
  //         "https://v6.exchangerate-api.com/v6/0e4c0b6173479f83c9344560/latest/USD",
  //         { signal: abortController.signal }
  //       )
  //       .then((data) => setConversionRates(data.data.conversion_rates));
  //   } catch (error) {
  //     if (error.name === "AbortError") return;
  //     throw error;
  //   }
  //   return () => {
  //     console.log("abort conversion rates");
  //     abortController.abort();
  //   };
  // }, []);

  const handleDelete = async (server) => {
    try {
      axios
        // .delete("http://localhost:8080/servers", {
        .delete("https://server-app-server.herokuapp.com/servers", {
          data: { _id: server._id },
        })
        .then(() => {
          setCreated(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const handleStart = async (server) => {
    setRunning(false);
    try {
      if (!server.isRunning) {
        // await axios.put("http://localhost:8080/servers", {
        await axios.put("https://server-app-server.herokuapp.com/servers", {
          _id: server._id,
        });
        setRunning(true);
        console.log(server);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleStop = async (server) => {
    setRunning(true);
    try {
      if (server.isRunning) {
        await axios.put("https://server-app-server.herokuapp.com/servers", {
          // await axios.put("http://localhost:8080/servers", {
          _id: server._id,
        });
        setRunning(false);
        console.log(server);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // const handleSelectedCurrency = async (e) => {
  //   try {
  //     let currentCurrency = e.target.value;
  //     setCurrency(currentCurrency);
  //     setSumToPay(conversionRates[currentCurrency]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleNextPage = () => {
    setPage(page + 1);
    getServers(page + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      getServers();
    }
  };
  console.log(servers);
  return (
    <div>
      <div className="servers-List-Page">
        <Search servers={servers} />
        <div className="serversContiner">
          {!servers.length > 0 || !(types.length > 0) ? (
            <div className="load">
              Loading...
              <Loader />
            </div>
          ) : (
            <div className="servers">
              <table className="servers-table">
                <tr>
                  <th>Name</th>
                  <th>IP address</th>
                  <th>Type</th>
                  <th>Price per minute</th>
                  <th>Server is running</th>
                  <th>Sum to pay</th>
                  <th>Start</th>
                  <th>Stop</th>
                  <th>Delete</th>
                </tr>
                {servers.map((server) => {
                  let typeId = types.find((type) => {
                    return type._id === server.type;
                  });
                  return (
                    <Server
                      server={server}
                      types={typeId}
                      handleDelete={handleDelete}
                      handleStop={handleStop}
                      handleStart={handleStart}
                      conversionRates={conversionRates}
                      currency={currency}
                      sumToPay={sumToPay}
                      setSumToPay={setSumToPay}
                      running={running}
                    />
                  );
                })}
              </table>
            </div>
          )}
        </div>
        <Pagination
          page={page}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          nextServers={nextServers}
        />
      </div>
    </div>
  );
};
export default ServersListPage;
