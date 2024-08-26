import axios from "axios";
import localStorage from "../services/LocalStorage";
import envConfig from "../config/envConfig";

export const BACKEND = envConfig.NODE_ENV !== "development"
  ? "http://192.168.20.201:3000/api/v1"
  : "https://eshop-pi-seven.vercel.app/api/v1";

export const apis = axios.create({
  baseURL: `${BACKEND}`,
  timeout: 10000,
});

export async function setAuthorization() {
  const tkn = await localStorage.get("token");
  apis.defaults.headers.Authorization = "Bearer " + tkn;
}
