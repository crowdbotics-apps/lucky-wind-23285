import AsyncStorage from '@react-native-community/async-storage';

const Constants = {
  ACCESS_TOKEN: 'access_token',
  USER: 'user',
};

export const StorageUtils = {
  getAccessToken: async () => {
    const token = await AsyncStorage.getItem(Constants.ACCESS_TOKEN);
    console.log("TOKEN : ", token)
    return token;
  },

  setAccessToken: async (token) => {
    AsyncStorage.setItem(Constants.ACCESS_TOKEN, token);
  },

  removeAccessToken: async () => {
    AsyncStorage.removeItem(Constants.ACCESS_TOKEN);
  },

  getUser: async () => {
    const user = await AsyncStorage.getItem(Constants.USER);
    return user ? JSON.parse(user) : {};
  },

  setUser: async (user) => {
    const userObject = user ? JSON.stringify(user) : null;
    AsyncStorage.setItem(Constants.USER, userObject);
  },

  removeUser: async () => {
    AsyncStorage.removeItem(Constants.USER);
  },
};