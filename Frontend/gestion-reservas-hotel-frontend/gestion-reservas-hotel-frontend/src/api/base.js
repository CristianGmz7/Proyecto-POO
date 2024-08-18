import axios from "axios";
const API_URL = "https://localhost:7252/api";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export { API_URL, API };
