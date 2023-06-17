export const fetchItems = async (query) => {
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const url = query ? `${serverAddress}/api/v1/sneakers?brand=${query}` : `${serverAddress}/api/v1/sneakers`;
    const response = await fetch(url);
    return await response.json();
}
// export const fetchOneItem = async (id) => {
//   const {data} = await get('api/sneakers/' + id)
//   return data
// }