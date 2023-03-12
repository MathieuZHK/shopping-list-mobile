import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {FAB, Snackbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import ConfirmDeleteModal from '../components/common/modal/ConfirmDeleteModal';
import ErrorModal from '../components/common/modal/ErrorModal';
import ShoppingList from '../components/shoppingList/ShoppingList';
import ShowShoppingListDto from '../core/dtos/shoppingList/ShowShoppingListDto';
import {shoppingListService} from '../core/services/shoppingList/shoppingListService';

interface HomeScreenProps {
  navigation: any;
  route: any;
}

const HomeScreen = (props: HomeScreenProps) => {
  const [snackVisible, setSnackVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [shoppingItemListId, setShoppingItemListmId] = useState('');
  const [shoppingItemListName, setShoppingItemListName] = useState('');
  const [deleteError, setDeleteError] = useState<any>('');
  const [showShoppingList, setShowShoppingList] =
    useState<ShowShoppingListDto[]>();

  const showDeleteModal = () => {
    setVisible(true);
  };
  const hideDeleteModal = () => {
    setVisible(false);
  };
  const showErrorModal = () => setErrorModalVisible(true);
  const hideErrorModal = () => {
    setErrorModalVisible(false);
    setVisible(false);
  };
  const onDismissSnackBar = () => setSnackVisible(false);

  useFocusEffect(
    useCallback(() => {
      if (props.route.params !== undefined) {
        if (props.route.params.fromRegister !== undefined) {
          setSnackVisible(props.route.params.fromRegister);
        }
      }
      const fetchData = async () => {
        try {
          const response: ShowShoppingListDto[] =
            await shoppingListService.getShoppingList();
          setShowShoppingList(
            response.sort((a, b) => a.name.localeCompare(b.name)),
          );
        } catch (error) {
          setDeleteError(error);
          showErrorModal();
        }
      };
      fetchData();
    }, [props.route.params]),
  );

  const onClickAddShoppingList = () => {
    props.navigation.navigate('AddShoppingList');
  };

  const onConfirmDelete = async () => {
    try {
      const response: ShowShoppingListDto =
        await shoppingListService.deleteShoppingList(shoppingItemListId);
      if (response) {
        if (response.id === shoppingItemListId) {
          onUpdateShoppingListWhenDeletedItem(response);
        }
      }
    } catch (error) {
      setDeleteError(error);
      showErrorModal();
    }
  };

  const onUpdateShoppingListWhenDeletedItem = (
    deletedItem: ShowShoppingListDto,
  ) => {
    if (deletedItem.id === shoppingItemListId) {
      if (showShoppingList !== undefined) {
        const itemIdIndex = showShoppingList?.findIndex(
          item => item.id === deletedItem.id,
        );
        showShoppingList.splice(itemIdIndex, 1);
        const updatedShoppingList = [...showShoppingList];
        setShowShoppingList(updatedShoppingList);
        hideDeleteModal();
      }
    }
  };

  const onDeleteShoppingElt = async (
    shoppingListElements: ShowShoppingListDto,
  ) => {
    setShoppingItemListName(shoppingListElements.name);
    setShoppingItemListmId(shoppingListElements.id);
    showDeleteModal();
  };

  const onUpdateShoppingElt = async (
    shoppingListElement: ShowShoppingListDto,
  ) => {
    props.navigation.navigate('AddShoppingList', {
      isUpdate: true,
      shoppingListElement: shoppingListElement,
    });
  };

  const onClickShoppingElt = (shoppingListElements: ShowShoppingListDto) => {
    props.navigation.navigate('ShoppingListContent', {
      shoppingItemId: shoppingListElements.id,
      shoppingItemName: shoppingListElements.name,
    });
  };

  return (
    <SafeAreaView className="h-full">
      <ConfirmDeleteModal
        visible={visible}
        hideDeleteModal={hideDeleteModal}
        itemName={shoppingItemListName}
        onConfirmDelete={onConfirmDelete}
      />
      <ErrorModal
        errorMessage={deleteError}
        errorModalVisible={errorModalVisible}
        onPressCloseModal={hideErrorModal}
      />
      <View className="h-full">
        <ShoppingList
          shoppingListElements={showShoppingList ? showShoppingList : []}
          onUpdateShoppingElt={onUpdateShoppingElt}
          onDeleteShoppingElt={onDeleteShoppingElt}
          onClickShoppingElt={onClickShoppingElt}
        />
      </View>
      <Snackbar
        visible={snackVisible}
        onDismiss={onDismissSnackBar}
        duration={1000}>
        Account created, you are connected !
      </Snackbar>
      <FAB
        icon="plus"
        size="medium"
        onPress={() => onClickAddShoppingList()}
        className="absolute m-5 right-0 bottom-0"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
