import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendResetEmail = async (email: string): Promise<string> => {
  try {
    const response = await instance.post('/api/v1/auth/sendMail', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default instance;
