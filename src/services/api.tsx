import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendResetEmail = async (email: string): Promise<string> => {
  try {
    const response = await instance.post('/api/v1/auth/password-reset-request', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const resetPassword = async (
  newPassword: string,
  token: string
): Promise<void> => {
  try {
    console.log(`/api/v1/auth/reset-password?token=${token}`);
    await instance.post(`/api/v1/auth/reset-password?token=${token}`, {
      newPassword,
    });
  } catch (error) {
    throw error;
  }
};




export default instance;

