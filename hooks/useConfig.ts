import { Config } from "@/constants/definitions";
import Store from "@/utils/store";

const defaultConfig: Config = {
  firstTimeTransfer: true,
  newUser: true,
};

export function useConfig() {
  const config = async (): Promise<Config> => {
    const rawConfig = await Store.get("config");
    if (!rawConfig) {
      return defaultConfig;
    }

    return JSON.parse(rawConfig) as Config;
  };

  const isFirstTimeTransfer = async () => {
    const result = await config();
    return result.firstTimeTransfer;
  };

  const isNewUser = async () => {
    const result = await config();
    return result.newUser;
  };

  const disableNewUser = async () => {
    const rawConfig = await config();
    const newConfig = { ...rawConfig, newUser: false };
    await Store.set("config", JSON.stringify(newConfig));
  };

  const toggleFirstTimeTransfer = async () => {
    const rawConfig = await config();
    const newConfig = { ...rawConfig, firstTimeTransfer: false };
    await Store.set("config", JSON.stringify(newConfig));
  };

  const clear = async () => {
    await Store.clear();
  };

  return {
    isFirstTimeTransfer,
    clear,
    toggleFirstTimeTransfer,
    isNewUser,
    disableNewUser,
  };
}
