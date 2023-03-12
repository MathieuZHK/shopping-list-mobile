import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, View} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import LoadingScreen from '../../components/common/Loading';
import ErrorModal from '../../components/common/modal/ErrorModal';
import ShoppingListDto from '../../core/dtos/shoppingList/ShoppingListDto';
import {shoppingListService} from '../../core/services/shoppingList/shoppingListService';

interface AddShoppingListScreenProps {
  navigation: any;
  route: any;
}

interface ShoppingListForm {
  name: string;
}

const AddShoppingListScreen = (props: AddShoppingListScreenProps) => {
  const [deleteError, setDeleteError] = useState<any>('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [loading, isLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const showErrorModal = () => setErrorModalVisible(true);
  const hideErrorModal = () => {
    setErrorModalVisible(false);
  };

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (props.route.params) {
        setIsUpdate(props.route.params.isUpdate);
        if (isUpdate) {
          reset({
            name: props.route.params.shoppingListElement.name,
          });
        }
      }
    }, [props.route.params, isUpdate, reset]),
  );

  const onSubmit = async (data: ShoppingListForm) => {
    isLoading(true);
    if (isUpdate) {
      const shoppingListDto: ShoppingListDto = {
        id: props.route.params.shoppingListElement.id,
        userId: '',
        name: data.name,
        owner: 'true',
        productList: [],
      };
      try {
        const response = await shoppingListService.updateShoppingList(
          shoppingListDto,
        );
        props.navigation.navigate('Home', {shoppingItem: response});
      } catch (error) {
        catchAndShowError(error);
      }
    } else {
      const shoppingListDto: ShoppingListDto = {
        id: '',
        userId: '',
        name: data.name,
        owner: 'true',
        productList: [],
      };
      try {
        const response = await shoppingListService.createShoppingList(
          shoppingListDto,
        );
        props.navigation.navigate('Home', {shoppingItem: response});
      } catch (error) {
        catchAndShowError(error);
      }
    }
  };

  const catchAndShowError = (error: unknown) => {
    isLoading(false);
    setDeleteError(error);
    showErrorModal();
  };

  const onPressBack = () => {
    props.navigation.navigate('Home');
  };

  return (
    <SafeAreaView className="h-full">
      <Appbar.Header mode="center-aligned" elevated={true}>
        <Appbar.BackAction
          onPress={() => {
            onPressBack();
          }}
        />
        <Appbar.Content
          title={isUpdate ? 'Update shopping List' : 'Add shopping list'}
        />
      </Appbar.Header>
      <View className="flex-1 p-4 justify-center">
        <View className="flex w-full">
          <Text
            variant="displaySmall"
            className="font-sans font-bold text-center">
            {isUpdate ? 'Update shopping List' : 'Add shopping list'}
          </Text>
          {loading ? (
            <LoadingScreen />
          ) : (
            <View className="flex w-full p-4 space-y-6">
              <View>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: 'Field is required',
                    },
                  }}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Name"
                      mode="flat"
                      right={<TextInput.Icon icon="cart-outline" />}
                    />
                  )}
                  name="name"
                />
                {errors.name && (
                  <Text className="text-red-600">{errors.name?.message}</Text>
                )}
              </View>
              <Button mode="contained" onPress={handleSubmit(onSubmit)}>
                {isUpdate ? 'UPDATE' : 'ADD'}
              </Button>
            </View>
          )}
        </View>
        <ErrorModal
          errorMessage={deleteError}
          errorModalVisible={errorModalVisible}
          onPressCloseModal={hideErrorModal}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddShoppingListScreen;
