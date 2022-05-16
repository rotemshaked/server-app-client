import axios from "axios";

export const getServersService = async (page, abortController) => {
  try {
    const allServers = await axios.get(
      "https://server-app-server.herokuapp.com/servers",
      { params: { page: page } },
      { signal: abortController.signal }
    );
    return allServers.data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted get servers request");
      return;
    } else {
      console.log("error in getting the servers from server");
    }
  }
  return () => {
    console.log("aborted get servers request");
    abortController.abort();
  };
};

export const getTypesService = async (abortController) => {
  try {
    const allTypes = await axios.get(
      "https://server-app-server.herokuapp.com/types",
      { signal: abortController.signal }
    );
    return allTypes.data;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted get servers types request");
      return;
    } else {
      console.log("error in getting the servers types from server");
    }
  }
  return () => {
    console.log("aborted get servers types request");
    abortController.abort();
  };
};

export const handleDeleteService = async (server, abortController) => {
  try {
    const deletedSuccessfully = await axios.delete(
      "https://server-app-server.herokuapp.com/servers",
      {
        data: { _id: server._id },
        signal: abortController.signal,
      }
    );
    return deletedSuccessfully;
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted get server delete request");
      return;
    } else {
      console.log("error in getting the server to delete from server");
    }
  }
  return () => {
    console.log("aborted deleting server request");
    abortController.abort();
  };
};

export const handleStartService = async (server, abortController) => {
  try {
    if (!server.isRunning) {
      const start = await axios.put(
        "https://server-app-server.herokuapp.com/servers",
        {
          _id: server._id,
          signal: abortController.signal,
        }
      );
      return start;
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted starting server request");
      return;
    } else {
      console.log("error in getting the server to start from server");
    }
  }
  return () => {
    console.log("aborted starting server request");
    abortController.abort();
  };
};

export const handleStopService = async (server, abortController) => {
  try {
    if (server.isRunning) {
      const stop = await axios.put(
        "https://server-app-server.herokuapp.com/servers",
        {
          _id: server._id,
          signal: abortController.signal,
        }
      );
      return stop;
    }
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("aborted stopping server request");
      return;
    } else {
      console.log("error in getting the server to stop from server");
    }
  }
  return () => {
    console.log("aborted stopping server request");
    abortController.abort();
  };
};
