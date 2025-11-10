import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9090/api", // adjust if needed
});

export const getApis = () => API.get("/v1/apis");
export const getMetrics = (id) => API.get(`/v1/metrics/latest/${id}`);

export default API;
