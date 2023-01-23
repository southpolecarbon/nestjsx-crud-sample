import axios, { AxiosInstance } from 'axios';

const API_URL = 'http://localhost:5004';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

export default axiosInstance;
