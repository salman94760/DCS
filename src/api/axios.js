import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api"
    : "/api";

const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // FormData ke liye Content-Type manually set nahi karna
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api;