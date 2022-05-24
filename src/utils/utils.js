export const slicedServersToShow = (array, page = 1) => {
  const limit = 10;
  let endIndex = page;
  let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  return slicedServers;
};

export const newServersToAddToList = (oldServersList, newServersList) => {
  let differentServers = [];
  for (let i = 0; i < oldServersList.length; i++) {
    const isNewServer = newServersList.find((newServer) => {
      return newServer._id !== oldServersList[i]._id;
    });
    isNewServer
      ? differentServers.push(isNewServer)
      : differentServers.push(oldServersList[i]);
  }
  return differentServers;
};
