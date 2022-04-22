import "./server.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Server = ({
  server,
  serverType,
  conversionRates,
  currency,
  handleDelete,
  handleStart,
  handleStop,
}) => {
  return (
    <tr key={server._id} className="tr-servers">
      <td>{server.name}</td>
      <td>{server.ipAddress}</td>
      <td>{serverType.name.toUpperCase()}</td>
      <td>{`${serverType.pricePerMinute}$`}</td>
      <td>
        {server.isRunning ? (
          <span className="on">ON</span>
        ) : (
          <span className="off">OFF</span>
        )}
      </td>
      <td>{`${(conversionRates[currency] * server.sumToPay).toFixed(
        2
      )} ${currency}`}</td>
      <td>
        <button
          className="button-2"
          onClick={() => handleStart(server)}
          title="Start"
        >
          <FontAwesomeIcon icon={faPlay} className="icon-3" />
        </button>
        {server.isRunning && (
          <FontAwesomeIcon icon={faDatabase} className="icon-2" />
        )}
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
