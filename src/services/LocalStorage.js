import AsyncStorage from "@react-native-async-storage/async-storage";

const localStorage = {
    async get(key) {
        try {
            const content = await AsyncStorage.getItem(key);
            const data = JSON.parse(content);
            return data;
        } catch {
            return null;
        }
    },
    async set(key, value) {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch(e) {
            console.log(e);
            return null;
        }
    },
    async remove(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch {
            return null;
        }
    },
};

export default localStorage;
