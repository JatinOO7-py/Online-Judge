import axios from "axios";

// const API_URL = "https://backend.hackathonhub.online";
const API_URL = "http://localhost:3001";

export const runCode = async (language, code, input) => {
  try {
    // const response = await axios.post(`${API_URL}/run`, {
    const response = await axios.post("http://localhost:3001/run", {
      language,
      code,
      input,
    });
    return response.data;
  } catch (error) {
    console.error("Error executing code:", error);
    throw error;
  }
};
