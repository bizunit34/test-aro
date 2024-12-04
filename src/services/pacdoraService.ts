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
    const response: { data: LoginResponse } = await axios.post(
      `${API_BASE_URL}/login`,
      payload,
    );

    return response.data;
  },
};

export default PacdoraService;
