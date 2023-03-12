import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SafeAreaView, View} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import LoadingScreen from '../../components/common/Loading';
import ErrorModal from '../../components/common/modal/ErrorModal';
import ProductDto from '../../core/dtos/product/ProductDto';
import ProductOnShoppingListDto from '../../core/dtos/product/ProductOnShoppingListDto';
import {productOnShoppingListService} from '../../core/services/product/productOnShoppingListService';

interface AddProductToShoppingListScreenProps {
  navigation: any;
  route: any;
}

interface ProductItemForm {
  name: string;
  barcode: string;
  qty: string;
  price: string;
}

const AddProductToShoppingListScreen = (
  props: AddProductToShoppingListScreenProps,
) => {
  const [deleteError, setDeleteError] = useState<any>('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [loading, isLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const showErrorModal = () => setErrorModalVisible(true);
  const hideErrorModal = () => {
    setErrorModalVisible(false);
  };

  const {navigation} = props;

  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      name: '',
      barcode: '',
      qty: '',
      price: '',
    },
  });

  useFocusEffect(
    useCallback(() => {
      if (props.route.params) {
        setIsUpdate(props.route.params.isUpdate);
        if (isUpdate) {
          reset({
            name: props.route.params.showProductOnShoppingListDto.name,
            barcode: props.route.params.showProductOnShoppingListDto.barcode
              ? props.route.params.showProductOnShoppingListDto.barcode.toString()
              : '',
            qty: props.route.params.showProductOnShoppingListDto.qty
              ? props.route.params.showProductOnShoppingListDto.qty.toString()
              : '',
            price: props.route.params.showProductOnShoppingListDto.price
              ? props.route.params.showProductOnShoppingListDto.price.toString()
              : '',
          });
        }
      }
    }, [props.route.params, isUpdate, reset]),
  );

  const onSubmit = async (data: ProductItemForm) => {
    if (isUpdate) {
      isLoading(true);
      const productDto: ProductDto = {
        id: '',
        name: data.name,
        barcode: parseInt(data.barcode, 10),
        qty: parseInt(data.qty, 10),
        price: parseFloat(data.price),
      };
      const productOnShoppingListDto: ProductOnShoppingListDto = {
        id: props.route.params.showProductOnShoppingListDto.id,
        product: productDto,
        shoppingListId:
          props.route.params.showProductOnShoppingListDto.shoppingListId,
      };
      onUpdateProductOnShoppingList(productOnShoppingListDto);
      return data;
    } else {
      isLoading(true);
      const productDto: ProductDto = {
        id: '',
        name: data.name,
        barcode: parseInt(data.barcode, 10),
        qty: parseInt(data.qty, 10),
        price: parseFloat(data.price),
      };
      const productOnShoppingListDto: ProductOnShoppingListDto = {
        id: '',
        product: productDto,
        shoppingListId: props.route.params.shoppingListId,
      };
      onCreateProductOnShoppingList(productOnShoppingListDto);
      return data;
    }
  };

  const onCreateProductOnShoppingList = async (
    productOnShoppingListDto: ProductOnShoppingListDto,
  ) => {
    try {
      const response =
        await productOnShoppingListService.createProductOnShoppingList(
          productOnShoppingListDto,
        );
      props.navigation.navigate('ShoppingListContent', {
        productItem: response,
        shoppingItemId: productOnShoppingListDto.shoppingListId,
        shoppingItemName: props.route.params.shoppingItemName,
      });
    } catch (error) {
      catchAndShowError(error);
    }
  };

  const onUpdateProductOnShoppingList = async (
    productOnShoppingListDto: ProductOnShoppingListDto,
  ) => {
    try {
      const response =
        await productOnShoppingListService.updateProductOnShoppingList(
          productOnShoppingListDto,
        );
      props.navigation.navigate('ShoppingListContent', {
        productItem: response,
        shoppingItemId: productOnShoppingListDto.shoppingListId,
        shoppingItemName: props.route.params.shoppingItemName,
      });
    } catch (error) {
      catchAndShowError(error);
    }
  };

  const catchAndShowError = (error: unknown) => {
    isLoading(false);
    setDeleteError(error);
    showErrorModal();
  };

  const onPressBack = () => {
    if (isUpdate) {
      navigation.navigate('ShoppingListContent', {
        shoppingItemId:
          props.route.params.showProductOnShoppingListDto.shoppingListId,
        shoppingItemName: props.route.params.shoppingItemName,
      });
    } else {
      navigation.navigate('ShoppingListContent', {
        shoppingItemId: props.route.params.shoppingListId,
        shoppingItemName: props.route.params.shoppingItemName,
      });
    }
  };

  return (
    <SafeAreaView className="h-full">
      <Appbar.Header mode="center-aligned" elevated={true}>
        <Appbar.BackAction
          onPress={() => {
            onPressBack();
          }}
        />
        <Appbar.Content title={`${props.route.params.shoppingItemName}`} />
      </Appbar.Header>
      <View className="flex-1 items-center justify-center p-4">
        <Text
          variant="displaySmall"
          className="font-sans font-bold text-center">
          {isUpdate ? 'Update product' : 'Add product'}
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
                    right={<TextInput.Icon icon="tag-text-outline" />}
                  />
                )}
                name="name"
              />
              {errors.name && (
                <Text className="text-red-600">{errors.name?.message}</Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Barcode"
                    mode="flat"
                    keyboardType="number-pad"
                    right={<TextInput.Icon icon="barcode-scan" />}
                  />
                )}
                name="barcode"
              />
              {errors.barcode && (
                <Text className="text-red-600">{errors.name?.message}</Text>
              )}
            </View>
            <View className="flex flex-row justify-between gap-1">
              <View className="flex-1">
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Quantity"
                      mode="flat"
                      keyboardType="number-pad"
                      right={<TextInput.Icon icon="pencil-outline" />}
                    />
                  )}
                  name="qty"
                />
              </View>
              <View className="flex-1">
                <Controller
                  control={control}
                  render={({field: {onChange, onBlur, value}}) => (
                    <TextInput
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      label="Price"
                      mode="flat"
                      keyboardType="number-pad"
                      right={<TextInput.Icon icon="cash-100" />}
                    />
                  )}
                  name="price"
                />
              </View>
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
    </SafeAreaView>
  );
};

export default AddProductToShoppingListScreen;
