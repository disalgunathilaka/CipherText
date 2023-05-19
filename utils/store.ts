import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async ({value, key}: {value: string; key: string}) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error(e);
  }
};
