import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {useAuth} from '../../core/context/Auth';

const UserInfo = () => {
  const auth = useAuth();
  const signOut = () => {
    auth.signOut();
  };
  return (
    <View className="flex flex-row align-middle justify-between p-2">
      <Text> Hello {auth.authData?.nickname}</Text>
      <Button mode="outlined" onPress={signOut} icon="logout">
        Sign Out
      </Button>
    </View>
  );
};

export default UserInfo;
