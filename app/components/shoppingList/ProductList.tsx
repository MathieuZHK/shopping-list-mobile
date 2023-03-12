import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Text} from 'react-native-paper';
import ShowProductOnShoppingListDto from '../../core/dtos/product/ShowProductOnShoppingListDto';
import ProductElement from './ProductElement';

interface ProductListProps {
  productListElements: ShowProductOnShoppingListDto[];
  onUpdateProductElt: (product: ShowProductOnShoppingListDto) => void;
  onDeleteProductElt: (product: ShowProductOnShoppingListDto) => void;
  onClickProductElt: (productOnShoppingListId: string, inCart: boolean) => void;
}

const ProductList = (props: ProductListProps) => {
  return (
    <SafeAreaView className="flex flex-col justify-between p-2 h-full">
      <View className="mb-5">
        <Text
          className="font-sans font-bold text-center"
          variant="displaySmall">
          Product list
        </Text>
      </View>
      <FlashList
        data={props.productListElements}
        ListEmptyComponent={
          <View className="flex items-center align-middle">
            <Text>Empty list</Text>
          </View>
        }
        renderItem={({item}) => (
          <ProductElement
            productOnShoppingList={item}
            onClickProductElt={props.onClickProductElt}
            onUpdateProductElt={props.onUpdateProductElt}
            onDeleteProductElt={props.onDeleteProductElt}
          />
        )}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  );
};

export default ProductList;
