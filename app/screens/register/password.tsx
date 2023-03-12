import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoadingScreen from '../../components/common/Loading';
import ErrorModal from '../../components/common/modal/ErrorModal';
import {useAuth} from '../../core/context/Auth';
import UserFormDto from '../../core/dtos/user/UserFormDto';

interface PasswordScreenNavigation {
  navigation: any;
  route: any;
}

interface FormData {
  password: string;
  confirmPassword: string;
}

const PasswordScreen = (props: PasswordScreenNavigation) => {
  const [visible, setVisible] = useState(false);
  const [registerError, setRegisterError] = useState<any>();
  const [loading, isLoading] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    props.navigation.navigate('Login');
  };
  const auth = useAuth();

  const {
    control,
    watch,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: FormData) => {
    isLoading(true);
    const userForm: UserFormDto = {
      email: props.route.params.email,
      nickname: props.route.params.nickname,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    try {
      await auth.signUp(userForm);
      props.navigation.navigate('Home', {fromRegister: true});
    } catch (error) {
      isLoading(false);
      showModal();
      setRegisterError(error);
    }
  };
  const onPressBack = () => props.navigation.navigate('Email');
  let pwd = watch('password');

  return (
    <SafeAreaView className="h-full">
      <Appbar.Header mode="center-aligned" elevated={true}>
        <Appbar.BackAction onPress={onPressBack} />
        <Appbar.Content title="Password" />
      </Appbar.Header>
      <View className="flex-1 items-center justify-center p-4">
        <Text
          variant="displaySmall"
          className="font-sans font-bold text-center">
          Sign up
        </Text>
        <Text variant="bodySmall" className="font-sans font-bold text-center">
          Set your password
        </Text>
        {loading ? (
          <View>
            <LoadingScreen />
          </View>
        ) : (
          <View className="flex w-full p-4 space-y-6">
            <ErrorModal
              errorMessage={registerError}
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
                    value:
                      /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                    message: 'Password is too weak',
                  },
                  minLength: {
                    value: 4,
                    message: 'Min value is 4 characters ',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Max value is 20 characters ',
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
            <View>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: 'Field is required',
                  },
                  validate: value =>
                    value === pwd || 'The passwords do not match',
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    label="Confirm password"
                    mode="flat"
                    secureTextEntry={true}
                    right={<TextInput.Icon icon="repeat-variant" />}
                  />
                )}
                name="confirmPassword"
              />
              {errors.confirmPassword && (
                <Text className="text-red-600">
                  {errors.confirmPassword?.message}
                </Text>
              )}
            </View>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              Submit
            </Button>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PasswordScreen;
