import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
