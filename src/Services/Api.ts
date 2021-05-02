// Core
import { AxiosInstance } from "axios";
// Utils
import { axiosInstace } from "utils/axios/axios.instance";

export interface ApiService {
  instance: AxiosInstance;
}
export class Api implements ApiService {
  public instance: AxiosInstance;

  constructor() {
    this.instance = axiosInstace;
  }
}
