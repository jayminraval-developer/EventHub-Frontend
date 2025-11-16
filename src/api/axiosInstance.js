import axios from "axios";

const api = axios.create({
  baseURL: "https://eventhub-backend-mveb.onrender.com/api",
});

// automatically add auth header & device token
api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("eventhubUser");
  if (stored) {
    const user = JSON.parse(stored);
    config.headers.Authorization = `Bearer ${user.token}`;
    config.headers["x-device-token"] = user.deviceToken;
  }
  return config;
});

export default api;
