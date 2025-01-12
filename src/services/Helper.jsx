import axios from "axios";

const BASE_URL = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://cartnow-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default BASE_URL;
