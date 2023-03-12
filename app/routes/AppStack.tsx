import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/home';
import AddProductToShoppingListScreen from '../screens/shoppinglist/addProductToShoppingList';
import AddShoppingListScreen from '../screens/shoppinglist/addShoppingList';
import ShoppingListContentScreen from '../screens/shoppinglist/shoppingListContent';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddShoppingList" component={AddShoppingListScreen} />
      <Stack.Screen
        name="ShoppingListContent"
        component={ShoppingListContentScreen}
      />
      <Stack.Screen
        name="AddProductToShoppingList"
        component={AddProductToShoppingListScreen}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
