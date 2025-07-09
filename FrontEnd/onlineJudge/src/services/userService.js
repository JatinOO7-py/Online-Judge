import axiosInstance from "./axiosInstance";

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/user/profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Failed to fetch user profile"
    );
  }
};

export const updateUserProfile = async (updatedData) => {
  try {
    const response = await axiosInstance.put("/user/profile", updatedData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data.message || "Failed to update user profile"
    );
  }
};

export default axiosInstance;
