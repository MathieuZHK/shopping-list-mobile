import axios, {isAxiosError} from 'axios';
import ShoppingListDto from '../../dtos/shoppingList/ShoppingListDto';
import ShoppingListOnUsers from '../../dtos/shoppingList/ShoppingListOnUser';
import ShowShoppingListDto from '../../dtos/shoppingList/ShowShoppingListDto';
import Message from '../../utils/Message.enum';
import {authService} from '../auth/authService';

const baseUrl = 'http://10.0.2.2:3000'; // TODO .env

const getShoppingList = async (): Promise<ShowShoppingListDto[]> => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.get(
        `${baseUrl}/shopping-list/shoppingListByUserId`,
        {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response.data.message;
      } else {
        throw Message.SERVER_DOWN;
      }
    }
  }
  throw Message.NO_AUTH_DATA;
};

const createShoppingList = async (
  shoppingListDto: ShoppingListDto,
): Promise<ShoppingListOnUsers> => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.post(
        `${baseUrl}/shopping-list/createShoppingListOnUser`,
        {
          id: shoppingListDto.id,
          name: shoppingListDto.name,
          userId: authData.id,
          owner: shoppingListDto.owner,
          productList: shoppingListDto.productList,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response.data.message;
      } else {
        throw Message.SERVER_DOWN;
      }
    }
  }
  throw Message.NO_AUTH_DATA;
};

const deleteShoppingList = async (
  shoppingListId: string,
): Promise<ShowShoppingListDto> => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.delete(
        `${baseUrl}/shopping-list/${shoppingListId}`,
        {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response.data.message;
      } else {
        throw Message.SERVER_DOWN;
      }
    }
  }
  throw Message.NO_AUTH_DATA;
};

const updateShoppingList = async (shoppingListDto: ShoppingListDto) => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.put(
        `${baseUrl}/shopping-list`,
        {
          id: shoppingListDto.id,
          name: shoppingListDto.name,
          userId: authData.id,
          owner: shoppingListDto.owner,
          productList: shoppingListDto.productList,
        },
        {
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw error.response.data.message;
      } else {
        throw Message.SERVER_DOWN;
      }
    }
  }
  throw Message.NO_AUTH_DATA;
};

export const shoppingListService = {
  getShoppingList,
  createShoppingList,
  deleteShoppingList,
  updateShoppingList,
};
