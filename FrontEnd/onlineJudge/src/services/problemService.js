import axiosInstance from "./axiosInstance";

export const getUserProblems = async () => {
  try {
    const response = await axiosInstance.get("/problems/my-problems");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Failed to fetch user's problems"
    );
  }
};

export const getProblemById = async (id) => {
  try {
    const response = await axiosInstance.get(`/problems/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch problem");
  }
};

export const updateProblem = async (id, problemData) => {
  try {
    const response = await axiosInstance.put(`/problems/${id}`, problemData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to update problem");
  }
};

export const getAllProblems = async () => {
  try {
    const response = await axiosInstance.get("/problems");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to fetch problems");
  }
};

export const deleteProblem = async (problemId) => {
  try {
    await axiosInstance.delete(`/problems/${problemId}`);
  } catch (error) {
    throw new Error(error.response?.data.message || "Failed to delete problem");
  }
};
