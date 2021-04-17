import axios from "axios";

export const axiosInstace = axios.create({
  baseURL: "https://animeover-api.herokuapp.com",
});
