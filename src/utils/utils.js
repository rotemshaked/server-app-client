export const slicedServersToShow = (array, page = 1) => {
  const limit = 10;
  let endIndex = page;
  let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  return slicedServers;
};

export const updateServersList = (oldServersList, newServersList) => {
  const updatedList = newServersList.filter((oldServer) => {
    return !oldServersList.find((newServer) => {
      return oldServer._id === newServer._id;
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
