import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar/navbar";
import Home from "./pages/home";
import ServersListPage from "./pages/serversList";
import CreateServer from "./pages/createServer";
import "./assets/styles.css";

function App() {
  const [servers, setServers] = useState([]);
  const [types, setTypes] = useState([]);
  const [conversionRates, setConversionRates] = useState(false);
  const [created, setCreated] = useState(false);
  const [running, setRunning] = useState(false);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/servers"
          element={
            <ServersListPage
              types={types}
              setTypes={setTypes}
              servers={servers}
              setServers={setServers}
              running={running}
              setRunning={setRunning}
              created={created}
              setCreated={setCreated}
              conversionRates={conversionRates}
              setConversionRates={setConversionRates}
            />
          }
        />
        <Route
          path="/create"
          element={
            <CreateServer
              types={types}
              servers={servers}
              setRunning={setRunning}
              created={created}
              setCreated={setCreated}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
