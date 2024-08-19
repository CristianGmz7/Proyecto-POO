import axios from "axios";
import { makeUseAxios } from "axios-hooks";
const API_URL = "https://localhost:7252/api";

const API = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const useCustomAxios = makeUseAxios({
  axios: API,
});

export { API_URL, API, useCustomAxios };
