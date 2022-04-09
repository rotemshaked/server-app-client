import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/navbar";
import Home from "./pages/home";
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
  const [showChangeCurrency, setShowChangeCurrency] = useState("false");

  return (
    <BrowserRouter>
      <NavBar
        conversionRates={conversionRates}
        setConversionRates={setConversionRates}
        setCurrency={setCurrency}
        showChangeCurrency={showChangeCurrency}
      />
      <Routes>
        <Route
          path="/"
          element={<Home setShowChangeCurrency={setShowChangeCurrency} />}
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
              setShowChangeCurrency={setShowChangeCurrency}
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
              setShowChangeCurrency={setShowChangeCurrency}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
