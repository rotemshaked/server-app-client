import { useEffect, useState } from "react";
import axios from "axios";
import "./../assets/styles.css";

const CreateServer = ({
  types,
  servers,
  created,
  setCreated,
  setOnServersPage,
}) => {
  const [newServer, setNewServer] = useState({
    name: " ",
    ipAddress: " ",
    typeId: "",
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    setCreated(false);
    setOnServersPage(false);
  }, []);

  const handleChange = (e) => {
    setError(false);
    setCreated(false);
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
        // .post("http://localhost:8080/create", newServer)
        .post("https://server-app-server.herokuapp.com/create", newServer)
        .then(() => {
          const newListOfservers = [...servers, newServer];
          console.log(newListOfservers);
          setCreated(true);
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
    setCreated(false);
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
              // placeholder="Name"
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
              // placeholder="IP address"
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
              {types.map((option) => {
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
          {created && <div className="created">✅ Server created!</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateServer;
