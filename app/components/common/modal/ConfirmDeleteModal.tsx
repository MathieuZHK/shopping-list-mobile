import React from 'react';
import {View} from 'react-native';
import {Button, Dialog, Portal, Text} from 'react-native-paper';

interface ConfirmDeleteModalProps {
  visible: boolean;
  itemName: string;
  hideDeleteModal: () => void;
  onConfirmDelete: () => void;
}

const ConfirmDeleteModal = (props: ConfirmDeleteModalProps) => {
  const {hideDeleteModal, itemName, onConfirmDelete, visible} = props;

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDeleteModal}>
        <Dialog.Title>Confirm</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">Are you sure to delete {itemName}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <View className="flex flex-row  justify-center gap-2 items-center w-full">
            <Button mode="contained" onPress={onConfirmDelete}>
              yes, sure
            </Button>
            <Button mode="outlined" onPress={hideDeleteModal}>
              no, i don't
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmDeleteModal;
