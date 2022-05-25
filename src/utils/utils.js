export const slicedServersToShow = (array, page = 1) => {
  const limit = 10;
  let endIndex = page;
  let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  return slicedServers;
};

export const updateNewServersList = (oldServersList, newServersList) => {
  const updatedList = newServersList.filter((newServer) => {
    return !oldServersList.find((oldServer) => {
      return oldServer._id === newServer._id;
    });
  });
  return updatedList;
};

export const updateServersList = (oldServersList, server) => {
  for (let i = 0; i < oldServersList.length; i++) {
    if (oldServersList[i]._id === server._id) {
      server.isRunning = !server.isRunning;
      oldServersList[i] = server;
      return oldServersList;
    }
  }
};
