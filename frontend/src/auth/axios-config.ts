import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.API_BASE_URL,
    withCredentials: true, 
  });