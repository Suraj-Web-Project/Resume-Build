import axios from "axios";

const api = axios.create({
  baseURL: "https://resume-build-vfd2.onrender.com/api",
});

export default api;
