import axios from "axios";

export const BASE_API_URL = "https://animeover-api.herokuapp.com";
export const axiosInstace = axios.create({
  baseURL: BASE_API_URL,
});
