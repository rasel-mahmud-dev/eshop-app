import { apis } from "../../apis";
import localStorage from "../../services/LocalStorage";

class AuthAction {
  async login(email, password) {
    try {
      const { data } = await apis.post("/auth/login", { email, password });
      return data?.data || null
    } catch (err) {
      console.log(err);
      throw err
    }
  }
  async verifyUser() {
    try {
      const token = await localStorage.get("token")
      const { data } = await apis.get("/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return data?.data || null
    } catch (err) {
      console.log(err);
      throw err
    }
  }
}

const authAction  = new AuthAction();

export default authAction
