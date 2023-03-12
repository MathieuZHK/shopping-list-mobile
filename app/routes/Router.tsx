import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import LoadingScreen from '../components/common/Loading';
import {useAuth} from '../core/context/Auth';
import AppStack from './AppStack';
import {AuthStack} from './AuthStack';

const Router = () => {
  const {authData, loading} = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      {authData ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Router;
