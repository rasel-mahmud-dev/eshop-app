import { apis, setAuthorization } from "../../apis";
import localStorage from "../../services/LocalStorage";

class CategoryAction {
  async fetchCategories(email, password) {
    try {
      await setAuthorization();
      const { data } = await apis.get("/categories");
      return data?.data || null;
    } catch (err) {
      throw err;
    }
  }

  async addCategory(name, logo, parent) {
    try {
      await setAuthorization();
      const { data } = await apis.post("/categories", { name, logo, parent });
      return data?.data || null;
    } catch (err) {
      throw err;
    }
  }
}

const categoryAction = new CategoryAction();

export default categoryAction;
