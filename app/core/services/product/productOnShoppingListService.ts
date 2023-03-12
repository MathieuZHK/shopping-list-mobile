import axios, {isAxiosError} from 'axios';
import ProductInCartInfoDto from '../../dtos/product/ProductInCartInfoDto';
import ProductOnShoppingListDto from '../../dtos/product/ProductOnShoppingListDto';
import Message from '../../utils/Message.enum';
import {authService} from '../auth/authService';

const baseUrl = 'http://10.0.2.2:3000'; // TODO .env

const getProductOnShoppingList = async (shoppingListId: string) => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.get(
        `${baseUrl}/shopping-list/productsOnShoppingListByShoppingId/${shoppingListId}`,
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
  } else {
    throw Message.NO_AUTH_DATA;
  }
};

const createProductOnShoppingList = async (
  productShoppingListDto: ProductOnShoppingListDto,
) => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.post(
        `${baseUrl}/product/productOnShoppingList`,
        {
          id: productShoppingListDto.id,
          shoppingListId: productShoppingListDto.shoppingListId,
          product: productShoppingListDto.product,
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
  } else {
    throw Message.NO_AUTH_DATA;
  }
};

const deleteProductOnShoppingList = async (productOnShoppingListId: string) => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.delete(
        `${baseUrl}/product/${productOnShoppingListId}`,
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
  } else {
    throw Message.NO_AUTH_DATA;
  }
};

const updateProductOnShoppingListInCart = async (dto: ProductInCartInfoDto) => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.put(
        `${baseUrl}/product/productOnShoppingListInCart`,
        dto,
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
  } else {
    throw Message.NO_AUTH_DATA;
  }
};

const updateProductOnShoppingList = async (dto: ProductOnShoppingListDto) => {
  const authData = await authService.getUserAuthData();
  if (authData) {
    try {
      const response = await axios.put(
        `${baseUrl}/product/productOnShoppingList/`,
        dto,
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
  } else {
    throw Message.NO_AUTH_DATA;
  }
};
export const productOnShoppingListService = {
  getProductOnShoppingList,
  createProductOnShoppingList,
  deleteProductOnShoppingList,
  updateProductOnShoppingListInCart,
  updateProductOnShoppingList,
};
