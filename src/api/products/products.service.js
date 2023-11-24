import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;


export const allProducts = async () => {
  return await axios.get(API_URL + "/products").then((response) => {
    return response.data;
  });
};

export const searchProducts = async (searchValue) => {
  return await axios
    .get(API_URL + `/search?name=${searchValue}`)
    .then((response) => {
      return response.data;
    });
};
