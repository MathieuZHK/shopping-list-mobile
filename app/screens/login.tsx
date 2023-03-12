import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Divider, Text, TextInput} from 'react-native-paper';
import ErrorModal from '../components/common/modal/ErrorModal';
import {useAuth} from '../core/context/Auth';

interface LoginScreenProps {
  navigation: any;
}

interface FormData {
  email: string;
  password: string;
}

const LoginScreen = (props: LoginScreenProps) => {
  const [loading, isLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loginError, setLogginError] = useState<any>();
  const auth = useAuth();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    isLoading(true);
    try {
      await auth.signIn(data.email, data.password);
    } catch (error) {
      isLoading(false);
      setLogginError(error);
      showModal();
    }
  };

  const styles = StyleSheet.create({
    scrollView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      fontFamily: 'sans serif',
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View className="flex w-full">
        <Text
          variant="displaySmall"
          className="font-sans font-bold text-center">
          Shopping list
        </Text>
      </View>
      <View className="flex w-full p-4 space-y-6">
        <ErrorModal
          errorMessage={loginError}
          errorModalVisible={visible}
          onPressCloseModal={hideModal}
        />
        <View>
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Field is required',
              },
              pattern: {
                value: /^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
                message: 'This not a valid email',
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                label="Email"
                mode="flat"
                right={<TextInput.Icon icon="email-outline" />}
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text className="text-red-600">{errors.email?.message}</Text>
          )}
        </View>
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
                label="Password"
                mode="flat"
                secureTextEntry={true}
                right={<TextInput.Icon icon="key-outline" />}
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text className="text-red-600">{errors.password?.message}</Text>
          )}
        </View>
        <View className="mb-3">
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={loading}>
            Sign in
          </Button>
        </View>
        <Divider />
        <View className="flex-row gap-2 justify-center">
          <View>
            <Text className="text-lg">Not a member ?</Text>
          </View>
          <View>
            <Pressable
              onPress={() => {
                props.navigation.navigate('Nickname');
              }}>
              <Text className="text-lg text-blue-700 underline">Sign up</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
