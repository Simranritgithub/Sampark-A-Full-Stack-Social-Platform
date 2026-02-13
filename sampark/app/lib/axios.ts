import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // future cookies/JWT ke liye
  headers: {
    "Content-Type": "application/json",
  },
});

// OPTIONAL: request interceptor
api.interceptors.request.use((config) => {
  // later: attach token
  return config;
});

// OPTIONAL: response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
