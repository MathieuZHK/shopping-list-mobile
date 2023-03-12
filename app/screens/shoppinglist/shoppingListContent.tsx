import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import LoadingScreen from '../../components/common/Loading';
import ConfirmDeleteModal from '../../components/common/modal/ConfirmDeleteModal';
import ErrorModal from '../../components/common/modal/ErrorModal';
import ProductList from '../../components/shoppingList/ProductList';
import ProductInCartInfoDto from '../../core/dtos/product/ProductInCartInfoDto';
import ProductOnShoppingListsDto from '../../core/dtos/product/ProductOnShoppingListsDto';
import ShowProductOnShoppingListDto from '../../core/dtos/product/ShowProductOnShoppingListDto';
import {productOnShoppingListService} from '../../core/services/product/productOnShoppingListService';

interface AddShoppingListScreenProps {
  navigation: any;
  route: any;
}

const ShoppingListContentScreen = (props: AddShoppingListScreenProps) => {
  const [loading, isLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showProductList, setShowProductList] = useState<
    ShowProductOnShoppingListDto[]
  >([]);
  const [deleteError, setDeleteError] = useState<any>('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<ShowProductOnShoppingListDto>();
  const [shoppingItemId, setShoppingItemId] = useState(
    props.route.params.shoppingItemId,
  );

  const showDeleteModal = () => setVisible(true);
  const hideDeleteModal = () => setVisible(false);
  const showErrorModal = () => setErrorModalVisible(true);
  const hideErrorModal = () => {
    setErrorModalVisible(false);
    setVisible(false);
  };

  useFocusEffect(
    useCallback(() => {
      setShoppingItemId(props.route.params.shoppingItemId);
      const fetchData = async () => {
        try {
          const response: ShowProductOnShoppingListDto[] =
            await productOnShoppingListService.getProductOnShoppingList(
              shoppingItemId,
            );
          setShowProductList(
            response.sort((a, b) => a.name.localeCompare(b.name)),
          );
        } catch (error) {
          setDeleteError(error);
          showErrorModal();
        }
      };
      fetchData();
    }, [props.route.params.shoppingItemId, shoppingItemId]),
  );

  const onConfirmDelete = async () => {
    try {
      isLoading(true);
      const response: ProductOnShoppingListsDto =
        await productOnShoppingListService.deleteProductOnShoppingList(
          productToDelete?.id ? productToDelete.id : '',
        );
      if (response) {
        if (response.id === productToDelete?.id) {
          onUpdateProductListWhenItemDeleted(response);
        }
      }
    } catch (error) {
      isLoading(false);
      setDeleteError(error);
      showErrorModal();
    }
  };

  const onUpdateProductListWhenItemDeleted = (
    productItem: ProductOnShoppingListsDto,
  ) => {
    if (showProductList !== undefined) {
      const itemIdIndex = showProductList?.findIndex(
        item => item.id === productItem.id,
      );
      showProductList.splice(itemIdIndex, 1);
      const updatedProductList = [...showProductList];
      setShowProductList(updatedProductList);
      hideDeleteModal();
      isLoading(false);
    }
  };

  const onDeleteProductElt = (product: ShowProductOnShoppingListDto) => {
    setProductToDelete(product);
    showDeleteModal();
  };

  const onClickAddProductElt = () => {
    props.navigation.navigate('AddProductToShoppingList', {
      shoppingListId: shoppingItemId,
      shoppingItemName: props.route.params.shoppingItemName,
    });
  };

  const onPressOnProductOnShoppingItem = async (
    productOnShoppingListId: string,
    inCart: boolean,
  ) => {
    isLoading(true);
    const dto: ProductInCartInfoDto = {
      id: productOnShoppingListId,
      inCart: inCart,
    };
    updateProductOnShoppingListInCartState(dto);
  };

  const updateProductOnShoppingListInCartState = async (
    dto: ProductInCartInfoDto,
  ) => {
    try {
      const response: ShowProductOnShoppingListDto =
        await productOnShoppingListService.updateProductOnShoppingListInCart(
          dto,
        );
      const itemIdIndex = showProductList?.findIndex(
        item => item.id === response.id,
      );
      showProductList.splice(itemIdIndex, 1);
      showProductList.push(response);
      showProductList.sort((a, b) => a.name.localeCompare(b.name));
      const updatedList = [...showProductList];
      setShowProductList(updatedList);
      isLoading(false);
    } catch (error) {
      isLoading(false);
      setDeleteError(error);
      showErrorModal();
    }
  };

  const onUpdateProductOnShoppingList = (dto: ShowProductOnShoppingListDto) => {
    props.navigation.navigate('AddProductToShoppingList', {
      isUpdate: true,
      showProductOnShoppingListDto: dto,
      shoppingItemName: props.route.params.shoppingItemName,
    });
  };

  return (
    <SafeAreaView className="h-full">
      <Appbar.Header mode="center-aligned" elevated={true}>
        <Appbar.BackAction
          onPress={() => {
            props.navigation.navigate('Home');
          }}
        />
        <Appbar.Content title={`${props.route.params.shoppingItemName}`} />
      </Appbar.Header>
      <ConfirmDeleteModal
        visible={visible}
        hideDeleteModal={hideDeleteModal}
        itemName={productToDelete?.name ? productToDelete.name : ''}
        onConfirmDelete={onConfirmDelete}
      />
      <ErrorModal
        errorMessage={deleteError}
        errorModalVisible={errorModalVisible}
        onPressCloseModal={hideErrorModal}
      />
      {loading ? <LoadingScreen /> : ''}
      <ProductList
        onClickProductElt={onPressOnProductOnShoppingItem}
        onUpdateProductElt={onUpdateProductOnShoppingList}
        onDeleteProductElt={onDeleteProductElt}
        productListElements={showProductList}
      />
      <FAB
        icon="cart-plus"
        size="medium"
        onPress={() => onClickAddProductElt()}
        className="absolute m-5 right-0 bottom-0"
      />
    </SafeAreaView>
  );
};

export default ShoppingListContentScreen;
