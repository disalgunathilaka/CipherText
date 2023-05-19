import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {StoreEnum} from '../enum/store-enum';

const httpClient = axios.create({});

httpClient.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(StoreEnum.AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default httpClient;
