import { apis } from "../../apis";
import localStorage from "../../services/LocalStorage";

class FileAction {
  async uploadFile() {
    try {
      const { data } = await apis.post("/files");
      return data?.data || null;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}

const fileAction = new FileAction();

export default fileAction;
