import React from 'react';
import {View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center">
      <ActivityIndicator color={'#000'} animating={true} size="small" />
    </View>
  );
};

export default LoadingScreen;
