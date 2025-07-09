// src/services/authService.js
import axios from "axios";

// const API_URL = "https://backend.hackathonhub.online";
const API_URL = "http://localhost:3001"

export const login = async (email, password) => {
  try {
    // const response = await axios.post(`${API_URL}/login`, { email, password });
    const response = await axios.post("http://localhost:3001/login", { email, password });
    localStorage.setItem("token", response.data.token); // Save token to localStorage
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signUp`, userData);
    return response.data;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    console.error("Error requesting password reset:", error);
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};
