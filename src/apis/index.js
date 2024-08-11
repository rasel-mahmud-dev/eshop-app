import axios from "axios";

export const BACKEND = "http://192.168.20.181:3000/api/v1";
// export const BACKEND = "https://portfolio-server-two-roan.vercel.app/api/v1";

export const apis = axios.create({
    baseURL: `${BACKEND}`,
    timeout: 10000,
});


