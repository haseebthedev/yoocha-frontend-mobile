import axios from "axios";
import { API_URL } from "config/config.dev";
import { loadString } from "utils/storage";

const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await loadString("UserToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
