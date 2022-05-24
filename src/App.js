import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navBar/navbar";
import Home from "./pages/home-page/home";
import ServersListPage from "./pages/servers-list-page/serversList";
import CreateServer from "./pages/create-server-page/createServer";
import "./assets/styles.css";

function App() {
  const [serversList, setServersList] = useState([]);
  const [serversTypes, setServersTypes] = useState([]);
  const [conversionRates, setConversionRates] = useState([]);
  const [updatedServersList, setUpdatedServersList] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [currencyIsShown, setCurrencyIsShown] = useState(false);

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
              conversionRates={conversionRates}
              currency={currency}
              setCurrencyIsShown={setCurrencyIsShown}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateServer
              serversTypes={serversTypes}
              updatedServersList={updatedServersList}
              setUpdatedServersList={setUpdatedServersList}
              setCurrencyIsShown={setCurrencyIsShown}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
