import axios from "axios";
import localStorage from "../services/LocalStorage";

export const BACKEND = "http://192.168.20.201:3000/api/v1";
// export const BACKEND = "https://portfolio-server-two-roan.vercel.app/api/v1";

export const apis = axios.create({
  baseURL: `${BACKEND}`,
  timeout: 10000,
});

export async function setAuthorization() {
  const tkn = await localStorage.get("token");
  apis.defaults.headers.Authorization = tkn;
}
