import Store from "@/utils/store"

export function useConfig() {
  const config = async () => {
    const rawConfig = await Store.get("config");
    if (!rawConfig) {
      return { firstTimeTransfer: true };
    }

    return JSON.parse(rawConfig);
  }

  const isFirstTimeTransfer = async () => {
    const result = await config();
    return result.firstTimeTransfer;
  }

  const toggleFirstTimeTransfer = async () => {
    const rawConfig = await config();
    const newConfig = { ...rawConfig, firstTimeTransfer: false };
    await Store.set("config", JSON.stringify(newConfig));
  }

  const clear = async () => {
    await Store.clear();
  }

  return { isFirstTimeTransfer, clear, toggleFirstTimeTransfer }
}
