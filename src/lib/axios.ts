import axios from "axios";
import { getAccessToken } from "./authToken";

const api = axios.create({
  baseURL: "https://nexlearn.noviindusdemosites.in",
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;
