import axios from "axios";
import { getAccessToken, getTokenType } from "./authToken";

const api = axios.create({
  baseURL: "https://nexlearn.noviindusdemosites.in",
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  const token =
    getAccessToken() ||
    (typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null);
  const tokenType =
    getTokenType() ||
    (typeof window !== "undefined"
      ? localStorage.getItem("token_type")
      : "bearer");

  if (token && config.headers) {
    const normalizedType =
      tokenType.charAt(0).toUpperCase() + tokenType.slice(1).toLowerCase();
    config.headers.Authorization = `${normalizedType} ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
);

export default api;
