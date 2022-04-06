import { useEffect, useState } from "react";
import axios from "axios";
import Server from "../components/server/server";
import Loader from "../components/loader/loader";
import Pagination from "../components/pagination/pagination";
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
}) => {
  const [currency, setCurrency] = useState("USD");
  const [sumToPay, setSumToPay] = useState("server.sumToPay");
  const [page, setPage] = useState(1);
  const [nextServers, setNextServers] = useState();

  useEffect(() => {
    setCreated(false);
  }, []);
  const getServers = async () => {
    try {
      const allServers = await axios.get(
        "https://server-app-server.herokuapp.com/servers",
        { params: { page: page } }
        // { signal: abortController.signal }
      );
      setServers(allServers.data.servers);
      setNextServers(allServers.data.next);
    } catch (error) {
      if (error.name === "AbortError") return;
      throw error;
    }
  };
  useEffect(() => {
    // const abortController = new AbortController();

    getServers();
    // return () => {
    //   console.log("abort servers");
    //   abortController.abort();
    // };
  }, [created, running, page]);

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

  useEffect(() => {
    const abortController = new AbortController();
    try {
      axios
        .get(
          "https://v6.exchangerate-api.com/v6/0e4c0b6173479f83c9344560/latest/USD",
          { signal: abortController.signal }
        )
        .then((data) => setConversionRates(data.data.conversion_rates));
    } catch (error) {
      if (error.name === "AbortError") return;
      throw error;
    }
    return () => {
      console.log("abort conversion rates");
      abortController.abort();
    };
  }, []);

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

  const handleSelectedCurrency = async (e) => {
    try {
      let currentCurrency = e.target.value;
      setCurrency(currentCurrency);
      setSumToPay(conversionRates[currentCurrency]);
      console.log(conversionRates[currentCurrency]);
    } catch (err) {
      console.log(err);
    }
  };

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

  let currencies = Object.keys(conversionRates);

  return (
    <div>
      <div className="servers-List-Page">
        <div className="serversContiner">
          {!servers.length > 0 || !(types.length > 0) || !currency ? (
            <div className="load">
              Loading...
              <Loader />
            </div>
          ) : (
            <div className="servers">
              {servers.map((server) => {
                let typeId = types.find((type) => {
                  return type._id === server.type;
                });
                return (
                  <div key={server._id}>
                    <Server
                      server={server}
                      types={typeId}
                      handleDelete={handleDelete}
                      handleStop={handleStop}
                      handleStart={handleStart}
                      handleSelectedCurrency={handleSelectedCurrency}
                      conversionRates={conversionRates}
                      currency={currency}
                      sumToPay={sumToPay}
                      setSumToPay={setSumToPay}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="pick-currency">
          Pick Currency &nbsp;
          <select
            onChange={(e) => handleSelectedCurrency(e)}
            className="currency"
          >
            {currencies.map((currency) => {
              return (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Pagination
        page={page}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        nextServers={nextServers}
      />
    </div>
  );
};
export default ServersListPage;
