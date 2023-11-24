import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getMyBasketProducts = async () => {
  return await axios
    .get(API_URL + `/view-cart`, {
      headers: {
        "Session-Id": sessionStorage.getItem("Session-ID"),
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const addMyBasketProducts = async (id) => {
  return await axios
    .post(
      API_URL + `/add-to-cart?id=${id}`,
      {},
      {
        headers: {
          "Session-Id": sessionStorage.getItem("Session-ID"),
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};

export const deleteMyBasketProducts = async (id) => {
  return await axios
    .post(
      API_URL + `/subtract-from-cart?id=${id}`,
      {},
      {
        headers: {
          "Session-Id": sessionStorage.getItem("Session-ID"),
        },
      }
    )
    .then((response) => {
      return response.data;
    });
};