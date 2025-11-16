// src/api/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://eventhub-backend-mveb.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("eventhubUser"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
    config.headers["x-device-token"] = user.deviceToken;
  }
  return config;
});

export default api;
