import { apis, setAuthorization } from "../../apis";
import localStorage from "../../services/LocalStorage";

class CategoryAction {
  async fetchCategories(email, password) {
    try {
      await setAuthorization()
      const { data } = await apis.get("/categories");
      return data?.data || null;
    } catch (err) {
      throw err;
    }
  }
}

const categoryAction = new CategoryAction();

export default categoryAction;
