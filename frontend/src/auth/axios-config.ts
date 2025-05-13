import axios from "axios";

export const axiosClient = axios.create({
    baseURL: 'https://gamerz-js-qd.onrender.com/api/v1',
    withCredentials: true, 
  });