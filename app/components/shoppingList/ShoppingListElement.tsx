import React from 'react';
import {View} from 'react-native';
import {List} from 'react-native-paper';
import ShowShoppingListDto from '../../core/dtos/shoppingList/ShowShoppingListDto';

interface ShoppingListElementProps {
  shoppingListElt: ShowShoppingListDto;
  onDeleteShoppingElt: (shoppingListElt: ShowShoppingListDto) => void;
  onUpdateShoppingElt: (shoppingListElt: ShowShoppingListDto) => void;
  onClickShoppingElt: (shoppingListElt: ShowShoppingListDto) => void;
}

const ShoppingListElement = (pp: ShoppingListElementProps) => {
  const {onClickShoppingElt, shoppingListElt} = pp;

  return (
    <View className="m-2 p2">
      <List.Item
        className=""
        title={shoppingListElt.name}
        onPress={() => {
          onClickShoppingElt(shoppingListElt);
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        titleStyle={{
          fontSize: 20,
          fontWeight: 'bold',
        }}
        // eslint-disable-next-line react/no-unstable-nested-components,
        left={props => <List.Icon {...props} icon="cart-outline" />}
      />
      {/* <View className="flex-row">
        <IconButton
          icon="update"
          size={30}
          onPress={() => {
            props.onUpdateShoppingElt(props.shoppingListElt);
          }}
        />
        <IconButton
          icon="delete-circle-outline"
          size={30}
          onPress={() => console.log('Pressed')}
        />
      </View> */}
    </View>
  );
};

export default ShoppingListElement;
