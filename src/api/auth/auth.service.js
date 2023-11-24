import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const getUserSessionId = async () => {
  return await axios.get(API_URL + "/createsession").then((response) => {
    return response.data;
  });
};
