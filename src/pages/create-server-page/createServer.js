import { useEffect, useState } from "react";
import { createNewServer } from "../../services/services";
import "./createServer.css";

const CreateServer = ({
  serversTypes,
  updatedServersList,
  setUpdatedServersList,
  setCurrencyIsShown,
}) => {
  const [newServer, setNewServer] = useState({
    ipAddress: "",
    name: "",
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

  const createAServer = async () => {
    const abortController = new AbortController();
    const createServer = await createNewServer(newServer, abortController);
    if (createServer) {
      setUpdatedServersList(true);
    } else setError(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setUpdatedServersList(false);
    createAServer();
  };

  return (
    <div className="create-server-page">
      <div className="create-page-container">
        <h1 className="title">Create A Server</h1>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name:
            <input
              className="name-input"
              type="text"
              name="name"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            IP address:
            <input
              className="address-input"
              type="text"
              name="address"
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Choose type:
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
