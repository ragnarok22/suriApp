import AsyncStorage from "@react-native-async-storage/async-storage";

class Store {
  async set(key: string, value: any) {
    await AsyncStorage.setItem(key, value.toString());
  }

  async get(key: string) {
    return await AsyncStorage.getItem(key);
  }

  async getAll() {
    return await AsyncStorage.getAllKeys();
  }

  async clear() {
    await AsyncStorage.clear();
  }
}

export default new Store();
