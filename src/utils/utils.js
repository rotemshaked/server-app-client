export const slicedServersToShow = (array, page = 1) => {
  const limit = 10;
  let endIndex = page;
  let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  return slicedServers;
};

export const updateServersList = (oldServersList, newServersList) => {
  const updatedList = newServersList.filter((newServer) => {
    return !oldServersList.find((oldServer) => {
      return (
        oldServer._id === newServer._id &&
        oldServer.isRunning === newServer.isRunning &&
        oldServer.sumToPay === newServer.sumToPay
      );
    });
  });
  return updatedList;
};

// const errorMessage = () => {
//   return (
//     <div className="error-message">
//       Couldn't find server that match your search :(
//     </div>
//   );
// };
