import React from 'react';
import {Pressable, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import ShowProductOnShoppingListDto from '../../core/dtos/product/ShowProductOnShoppingListDto';

interface ProductElementProps {
  productOnShoppingList: ShowProductOnShoppingListDto;
  onUpdateProductElt: (product: ShowProductOnShoppingListDto) => void;
  onDeleteProductElt: (product: ShowProductOnShoppingListDto) => void;
  onClickProductElt: (productOnShoppingListId: string, inCart: boolean) => void;
}

const ProductElement = (props: ProductElementProps) => {
  const inCartClassName = 'flex-1 rounded-xl bg-gray-300';
  const notInCartClassName = 'flex-1';
  return (
    <View className="flex flex-col p-2  border-2 m-2 rounded-xl">
      <Pressable
        onPress={() => {
          props.productOnShoppingList.inCart
            ? props.onClickProductElt(props.productOnShoppingList.id, false)
            : props.onClickProductElt(props.productOnShoppingList.id, true);
        }}
        className={
          props.productOnShoppingList.inCart
            ? inCartClassName
            : notInCartClassName
        }>
        <View className="flex flex-row justify-between align-middle p-2 mb-3 ">
          <Text>{props.productOnShoppingList.name}</Text>
          <Text>{props.productOnShoppingList.qty} qty</Text>
          <Text>{props.productOnShoppingList.price} Euro</Text>
        </View>
      </Pressable>
      <View className="flex-row justify-end gap-2 pt-2">
        <Button
          icon="update"
          mode="outlined"
          onPress={() => {
            props.onUpdateProductElt(props.productOnShoppingList);
          }}>
          Update
        </Button>
        <Button
          mode="contained"
          icon="delete-circle-outline"
          onPress={() => {
            props.onDeleteProductElt(props.productOnShoppingList);
          }}>
          Delete
        </Button>
      </View>
    </View>
  );
};

export default ProductElement;
