import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {isAxiosError} from 'axios';
import UserFormDto from '../../dtos/user/UserFormDto';
import Message from '../../utils/Message.enum';

export type AuthData = {
  access_token: string;
  refreshToken: string;
  email: string;
  nickname: string;
  id: string;
};

const baseUrl = 'http://10.0.2.2:3000'; // TODO .env

const signIn = async (email: string, password: string): Promise<AuthData> => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signin`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data.message;
    } else {
      throw Message.SERVER_DOWN;
    }
  }
};

const signUp = async (userForm: UserFormDto): Promise<AuthData> => {
  try {
    const response = await axios.post(`${baseUrl}/auth/signup`, userForm);
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw error.response.data.message;
    } else {
      throw Message.SERVER_DOWN;
    }
  }
};

const getUserAuthData = async () => {
  await AsyncStorage.getItem('@AuthData');
  const authDataSerialized = await AsyncStorage.getItem('@AuthData');
  if (authDataSerialized) {
    const _authData: AuthData = JSON.parse(authDataSerialized);
    return _authData;
  }
};

export const authService = {
  signIn,
  signUp,
  getUserAuthData,
};
