export const slicedServersToShow = (array, page = 1) => {
  const limit = 10;
  let endIndex = page;
  let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  return slicedServers;
};

export const updateNewServersList = (oldServersList, newServersList) => {
  const newServers = newServersList.filter((newServer) => {
    return !oldServersList.find((oldServer) => {
      return oldServer._id === newServer._id;
    });
  });
  return [...newServers];
};

export const updateServersList = (oldServersList, server) => {
  for (let i = 0; i < oldServersList.length; i++) {
    if (oldServersList[i]._id === server._id) {
      oldServersList[i] = server;
      return oldServersList;
    }
  }
};
