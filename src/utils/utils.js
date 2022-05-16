export const slicedServersToShow = (array, page = 1) => {
  const limit = 10;
  let endIndex = page;
  let slicedServers = array.slice((endIndex - 1) * limit, endIndex * limit);
  return slicedServers;
};
