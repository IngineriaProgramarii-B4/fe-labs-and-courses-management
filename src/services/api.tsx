import axios from 'axios';
import jwt_decode from "jwt-decode";
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


interface DecodedToken {
  role: string;
}

const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwt_decode(token);
    return decoded.role; 
  } catch (error) {
    console.error("Token-ul nu a putut fi decodat.", error);
    return null;
  }
};




export default instance;

