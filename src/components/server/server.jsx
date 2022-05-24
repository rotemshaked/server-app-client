import { useEffect, useState } from "react";
import {
  handleStartService,
  handleStopService,
  handleDeleteService,
} from "../../services/services";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStop } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./server.css";

const Server = ({
  server,
  serverType,
  conversionRates,
  currency,
  setUpdatedServersList,
  setSumChange,
  sumChange,
}) => {
  const handleStart = async (server) => {
    const abortController = new AbortController();
    if (!server.isRunning) {
      await handleStartService(server, abortController);
      setSumChange(!sumChange);
      // setUpdatedServersList(true);
    }
  };

  const handleStop = async (server) => {
    const abortController = new AbortController();
    if (server.isRunning) {
      await handleStopService(server, abortController);
      setSumChange(!sumChange);
    }
  };

  const handleDelete = async (server) => {
    const abortController = new AbortController();
    const deletedSuccessfully = await handleDeleteService(
      server,
      abortController
    );
    if (deletedSuccessfully) setUpdatedServersList(true);
  };

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
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

export default Server;
