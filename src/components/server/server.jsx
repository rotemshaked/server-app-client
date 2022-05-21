import "./server.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { handleStartService, handleStopService } from "../../services/services";

const Server = ({
  server,
  serverType,
  conversionRates,
  currency,
  handleDelete,
}) => {
  const [isRunningServer, setIsRunningServer] = useState(false);
  // console.log(server.isRunning, "server.isRunning");
  // console.log(isRunningServer, "isrun");

  const handleStart = async (server) => {
    const abortController = new AbortController();
    if (!isRunningServer) {
      const start = await handleStartService(server, abortController);
      if (start) setIsRunningServer(true);
      console.log(start);
    }
    console.log("start");
  };

  const handleStop = async (server) => {
    const abortController = new AbortController();
    if (isRunningServer) {
      let stop = await handleStopService(server, abortController);
      console.log(stop);
      if (stop) setIsRunningServer(false);
    }
    console.log("stop");
  };

  const sumToPay = (server) => {
    let sum = `${(conversionRates[currency] * server.sumToPay).toFixed(
      2
    )} ${currency}`;
    console.log(sum);
    return sum;
  };

  return (
    <tr key={server._id} className="tr-servers">
      <td>{server.name}</td>
      <td>{server.ipAddress}</td>
      <td>{serverType.name.toUpperCase()}</td>
      <td>{`${serverType.pricePerMinute}$`}</td>
      <td>
        {isRunningServer ? (
          <span className="on">ON</span>
        ) : (
          <span className="off">OFF</span>
        )}
      </td>
      <td>{sumToPay(server)}</td>
      {/* <td>{`${(conversionRates[currency] * server.sumToPay).toFixed(
        2
      )} ${currency}`}</td> */}
      <td>
        <button
          className="button-2"
          onClick={() => handleStart(server)}
          title="Start"
        >
          <FontAwesomeIcon icon={faPlay} className="icon-3" />
        </button>
      </td>
      <td>
        <button
          className="button-2"
          onClick={() => handleStop(server)}
          title="Stop"
        >
          <FontAwesomeIcon icon={faStop} className="icon-4" />
        </button>
      </td>
      <td>
        <button
          className="button-2"
          onClick={() => handleDelete(server)}
          title="Delete"
        >
          <FontAwesomeIcon icon={faTrash} className="icon-2" />
        </button>
      </td>
    </tr>
  );
};

export default Server;
