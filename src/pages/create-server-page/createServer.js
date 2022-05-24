import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./createServer.css";

const CreateServer = ({
  serversTypes,
  updatedServersList,
  setUpdatedServersList,
  setCurrencyIsShown,
}) => {
  const [newServer, setNewServer] = useState({
    name: " ",
    ipAddress: " ",
    typeId: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setUpdatedServersList(false);
    setCurrencyIsShown(false);
  }, []);

  const handleChange = (e) => {
    setError(false);
    setUpdatedServersList(false);
    switch (e.target.name) {
      case "name":
        setNewServer((prev) => ({ ...prev, name: e.target.value }));
        break;
      case "address":
        setNewServer((prev) => ({ ...prev, ipAddress: e.target.value }));
        break;
      case "type":
        setNewServer((prev) => ({ ...prev, typeId: e.target.value }));
        break;
      default:
        break;
    }
  };

  const createServer = async () => {
    try {
      await axios
        .post("https://server-app-server.herokuapp.com/create", newServer)
        .then(() => {
          setUpdatedServersList(true);
        })
        .catch((error) => {
          console.log("error 1");
          setError(true);
        });
    } catch {
      console.log("error 2");
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setUpdatedServersList(false);
    createServer();
  };

  return (
    <div className="create-server-page">
      <div className="create-page-container">
        <h1 className="title">Create A Server</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name :
            <input
              className="name-input"
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            IP address :
            <input
              className="address-input"
              type="text"
              name="address"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Choose type :
            <select
              id="type"
              name="type"
              className="select"
              value={newServer.typeId}
              onChange={handleChange}
            >
              <option></option>
              {serversTypes.map((option) => {
                return (
                  <option value={option._id} key={option._id}>
                    {`${option.name.toUpperCase()} - ${
                      option.pricePerMinute
                    }$ per minute`}
                  </option>
                );
              })}
            </select>
          </label>
          <input
            type="submit"
            value="CREATE A SERVER"
            className="submit-Button"
          />
          {error && <div className="error">❌ An Error occurred</div>}
          {updatedServersList && (
            <div className="created">✅ Server created!</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateServer;