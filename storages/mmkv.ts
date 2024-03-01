import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

const store = (key: string, value: string) => {
  storage.set(key, value);
};

const retrieve = <T>(key: string): T => {
  const value = storage.getString(key);
  if (!value) return [] as T;

  return JSON.parse(value) as T;
};

const reset = () => {
  storage.clearAll();
};

export { store, retrieve, reset };
