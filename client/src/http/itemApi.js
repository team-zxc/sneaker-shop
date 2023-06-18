export const fetchItems = async (query) => {
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const url = query ? `${serverAddress}/api/v1/sneakers?brand=${query}` : `${serverAddress}/api/v1/sneakers/`;
    const response = await fetch(url);
    return await response.json();
}
export const fetchOneItem = async (id) => {
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const url = `${serverAddress}/api/v1/sneakers/${id}/`;
    const response = await fetch(url);
    return await response.json();
}

export const fetchPopularItems = async (limit) => {
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const url = `${serverAddress}/api/v1/populars?limit=${limit}`;
    const response = await fetch(url);
    return await response.json();
}