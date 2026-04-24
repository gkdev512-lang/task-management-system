import axios from "axios";
import api from "./api";

const API_URL = "http://localhost:5109/api/Users";

const authService = {
  register: (payload) => axios.post(`${API_URL}/register`, payload),
  login: (credentials) => axios.post(`${API_URL}/login`, credentials),
  changePassword: (passwordData) => api.post("/Users/change-password", passwordData)
};

export default authService;
