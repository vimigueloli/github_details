import axios from 'axios';

const setupApiClient = (ctx = undefined) => {

  const api = axios.create({
    baseURL:'https://api.github.com'
  });

  return api;
};

export { setupApiClient };
