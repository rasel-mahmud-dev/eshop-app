import { apis, setAuthorization } from "../../apis";
import localStorage from "../../services/LocalStorage";

class CartAction {
  async fetchCarts() {
    try {
      let cartCache = await this.getFromCache();
      if (cartCache) return cartCache;
      await setAuthorization();
      const { data } = await apis.get("/carts");
      const cartItems = data?.data || [];
      await localStorage.set("cartItems", JSON.stringify(cartItems));
      return cartItems;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getFromCache() {
    try {
      let cartCache = await localStorage.get("cartItems");
      if (!cartCache) {
        throw Error("Cart not found");
      }
      let data = JSON.parse(cartCache ?? "");
      if (!data && !Array.isArray(data)) throw Error("Cart not found");
      return data;

    } catch (err) {
      return null;
    }
  }

  async appendNew(item) {
    try {
      let cartCache = await this.getFromCache();
      if (cartCache) {
        cartCache.push(item);
      }

      await localStorage.set("cartItems", JSON.stringify(cartCache));
      return cartCache;
      
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}

const cartAction = new CartAction();

export default cartAction;
