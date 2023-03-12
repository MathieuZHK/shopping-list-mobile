import React from 'react';
import {Button, Dialog, Portal, Text} from 'react-native-paper';
import {useAuth} from '../../../core/context/Auth';

interface ErrorModalProps {
  errorModalVisible: boolean;
  errorMessage: string;
  onPressCloseModal: () => void;
}

const ErrorModal = (props: ErrorModalProps) => {
  const auth = useAuth();
  const {errorMessage, errorModalVisible, onPressCloseModal} = props;

  return (
    <Portal>
      <Dialog visible={errorModalVisible} onDismiss={onPressCloseModal}>
        <Dialog.Title>Connection failed</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">{errorMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              onPressCloseModal();
              auth.signOut();
            }}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ErrorModal;
