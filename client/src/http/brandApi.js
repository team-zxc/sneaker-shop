export const fetchBrands = async () => {
    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const url = `${serverAddress}/api/v1/brands`;
    const response = await fetch(url);
    const data = await response.json();
    return data.map(item => item.title);
}