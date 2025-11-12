import axios from "axios";
import sampleApis from "../data/sampleApis.json";
import sampleMetrics from "../data/sampleMetrics.json";

const API = axios.create({
  baseURL: "http://localhost:9090/api", // adjust if needed
});

// Get list of APIs
export const getApis = async () => {
  try {
    const res = await API.get("/v1/apis");
    console.log("Fetched APIs:", res.data);
    if(res.data.length === 0) {
      console.warn("No APIs found from backend, using sample APIs.");
      return { data: sampleApis }; // return sample if none from backend
    }
    return res;
  } catch (error) {
    console.warn("API not reachable, using sample APIs.");
    return { data: sampleApis }; // return sample
  }
};

// Get metrics for a specific API
export const getMetrics = async (id) => {
  try {
    const res = await API.get(`/v1/metrics/latest/${id}`);
    if(res.data.length === 0) {
      console.warn(`No metrics found for API ID ${id}, using sample metrics.`);
      return { data: sampleMetrics[id] || [] }; // return sample or empty array
    }
    return res;
  } catch (error) {
    console.warn(`Metrics API for ID ${id} not reachable, using sample metrics.`);
    return { data: sampleMetrics[id] || [] }; // return sample or empty array
  }
};

export default API;
