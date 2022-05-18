import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navBar/navbar";
import Home from "./pages/home-page/home";
import ServersListPage from "./pages/serversList";
import CreateServer from "./pages/createServer";
import "./assets/styles.css";

function App() {
  const [serversList, setServersList] = useState([]);
  const [serversTypes, setServersTypes] = useState([]);
  const [conversionRates, setConversionRates] = useState([]);
  const [updatedServersList, setUpdatedServersList] = useState(false);
  const [runningServer, setRunningServer] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [currencyIsShown, setCurrencyIsShown] = useState("false");
  const [input, setInput] = useState("");
  const [searchDropDown, setSearchDropDown] = useState("");
  const [selectedSearchType, setSelectedSearchType] = useState([]);
  const [selectedSearchAmount, setSelectedSearchAmount] = useState([]);

  return (
    <BrowserRouter>
      <Navbar
        conversionRates={conversionRates}
        setConversionRates={setConversionRates}
        setCurrency={setCurrency}
        currencyIsShown={currencyIsShown}
      />
      <Routes>
        <Route
          path="/"
          element={<Home setCurrencyIsShown={setCurrencyIsShown} />}
        />
        <Route
          path="/servers"
          element={
            <ServersListPage
              serversList={serversList}
              setServersList={setServersList}
              serversTypes={serversTypes}
              setServersTypes={setServersTypes}
              updatedServersList={updatedServersList}
              setUpdatedServersList={setUpdatedServersList}
              runningServer={runningServer}
              setRunningServer={setRunningServer}
              conversionRates={conversionRates}
              currency={currency}
              setConversionRates={setConversionRates}
              setCurrencyIsShown={setCurrencyIsShown}
              input={input}
              setInput={setInput}
              searchDropDown={searchDropDown}
              setSearchDropDown={setSearchDropDown}
              setSelectedSearchType={setSelectedSearchType}
              selectedSearchType={selectedSearchType}
              selectedSearchAmount={selectedSearchAmount}
              setSelectedSearchAmount={setSelectedSearchAmount}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateServer
              serversTypes={serversTypes}
              serversList={serversList}
              updatedServersList={updatedServersList}
              setUpdatedServersList={setUpdatedServersList}
              setRunningServer={setRunningServer}
              setCurrencyIsShown={setCurrencyIsShown}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
