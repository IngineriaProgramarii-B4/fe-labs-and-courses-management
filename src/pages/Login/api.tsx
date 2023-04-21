// src/api.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8082', // URL-ul serverului Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
