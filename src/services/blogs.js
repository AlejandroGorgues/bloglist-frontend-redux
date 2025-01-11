import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then((response) => response);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response;
};

const update = async (currObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const updateUrl = baseUrl + "/" + currObject.id;
  const response = await axios.put(updateUrl, currObject, config);
  return response;
};

const remove = async (currObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const updateUrl = baseUrl + "/" + currObject.id;
  const response = await axios.delete(updateUrl, config);
  return response;
};

export default { getAll, create, update, remove, setToken };
