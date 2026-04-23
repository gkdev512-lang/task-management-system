import axios from "axios";

const API_URL = "http://localhost:5109/api/Users";

const authService = {
  login: (credentials) => axios.post(`${API_URL}/login`, credentials)
};

export default authService;
