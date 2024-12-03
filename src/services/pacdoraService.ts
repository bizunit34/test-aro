import axios from 'axios';

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const API_BASE_URL = 'https://api.example.com'; // Replace with your API base URL

const PacdoraService = {
  login: async (payload: LoginPayload): Promise<LoginResponse> => {
    const response = await axios.post(`${API_BASE_URL}/login`, payload);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axios.post(`${API_BASE_URL}/logout`);
  },

  signUp: async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await axios.post(`${API_BASE_URL}/signup`, payload);
    return response.data;
  },
};

export default PacdoraService;
