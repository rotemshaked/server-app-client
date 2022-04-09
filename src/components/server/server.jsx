import "./server.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";

const Server = ({
  server,
  types,
  handleDelete,
  handleStart,
  handleStop,
  conversionRates,
  currency,
  running,
}) => {
  console.log(conversionRates[currency], "ooooo", currency);
  return (
    <tr key={server._id} className="tr-servers">
      <td>{server.name}</td>
      <td>{server.ipAddress}</td>
      <td>{types.name}</td>
      <td>{`${types.pricePerMinute}$`}</td>
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
        <button className="button-2" onClick={() => handleStart(server)}>
          ▶
        </button>
        {server.isRunning && (
          <FontAwesomeIcon icon={faDatabase} className="icon-2" />
        )}
      </td>
      <td>
        <button className="button-2" onClick={() => handleStop(server)}>
          🟥
        </button>
      </td>
      <td>
        <button className="button-2" onClick={() => handleDelete(server)}>
          Delete server
        </button>
      </td>
    </tr>
    // <div className="server">
    //   <div className="name">{server.name}</div>
    //   <div className="address">
    //     IP address: <span className="server-span">{server.ipAddress}</span>
    //   </div>
    //   <div className="type">
    //     Type: <span className="server-span">{types.name}</span>
    //   </div>
    //   <div className="price">
    //     Price per minute:
    //     <span className="server-span">{`${types.pricePerMinute}$`}</span>
    //   </div>
    //   <div className="running">
    //     Server is running:
    //     <span className="server-span">
    //       {server.isRunning ? (
    //         <span className="on">ON</span>
    //       ) : (
    //         <span className="off">OFF</span>
    //       )}
    //     </span>
    //   </div>
    //   <div className="sum">
    //     Sum to pay:
    //     <span className="server-span">{`${(
    //       conversionRates[currency] * server.sumToPay
    //     ).toFixed(2)} ${currency}`}</span>
    //   </div>
    //   <div className="buttons-and-icon">
    //     <div>
    //       <button className="button-2" onClick={() => handleStart(server)}>
    //         Start
    //       </button>
    //       <button className="button-2" onClick={() => handleStop(server)}>
    //         Stop
    //       </button>
    //       <button className="button-2" onClick={() => handleDelete(server)}>
    //         Delete server
    //       </button>
    //     </div>
    //     <div>
    //       {server.isRunning && (
    //         <FontAwesomeIcon icon={faDatabase} className="icon-2" />
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Server;
