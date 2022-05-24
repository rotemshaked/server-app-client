export const slicedServersToShow = (array, page = 1) => {
  const limit = 10;
  let endIndex = page;
  let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  return slicedServers;
};

export const newServersToAddToList = (oldServersList, newServersList) => {
  const updatedList = newServersList.filter((newServer) => {
    return !oldServersList.find((oldServer) => {
      return oldServer._id === newServer._id;
    });
  });
  return updatedList;
};
