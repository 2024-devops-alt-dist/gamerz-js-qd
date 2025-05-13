import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'https://gamerz-js-qd.onrender.com',
    withCredentials: true, 
  });