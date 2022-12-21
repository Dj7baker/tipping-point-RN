import axios from "axios";

const tippingpointApi = axios.create({
  baseURL: "http://localhost:3001",
});

export const getItems = () => {
  return tippingpointApi.get("/items").then((res) => {
    return res.data;
  });
};

export const getItemById = (id) => {
  return tippingpointApi.get(`/items/${id}`).then((res) => {
    return res.data;
  });
};

export const postItem = (obj) => {
  return tippingpointApi.post(`/items/`, obj).then((res) => {
    return res.data;
  });
};
