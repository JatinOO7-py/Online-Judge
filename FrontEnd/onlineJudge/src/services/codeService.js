import axiosInstance from "./axiosInstance";

export const saveUserCode = async (
  problemId,
  userId,
  code,
  language,
  status
) => {
  try {
    const response = await axiosInstance.post("/user/saveUserCode", {
      problemId,
      userId,
      code,
      language,
      status,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving user code:", error);
    throw error;
  }
};

export const getUserCode = async (problemId, userId, language) => {
  try {
    const response = await axiosInstance.get("/user/getUserCode", {
      params: { problemId, userId, language },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user code:", error);
    throw error;
  }
};

export const getAllSubmissions = async (problemId) => {
  try {
    const response = await axiosInstance.get(
      `submissions/submissions/${problemId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching submissions:", error);
    throw error;
  }
};

export const getSolvedProblems = async (userId) => {
  try {
    const response = await axiosInstance.get(
      `/submissions/submissions/solved/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching solved problems:", error);
    throw error;
  }
};
