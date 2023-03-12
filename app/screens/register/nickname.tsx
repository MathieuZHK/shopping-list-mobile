import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

interface NicknameScreenProps {
  navigation: any;
  route: any;
}

interface FormData {
  nickname: string;
}

const NicknameScreen = (props: NicknameScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nickname: '',
    },
  });

  const onSubmit = (data: FormData) => {
    props.navigation.navigate('Email', {nickname: data.nickname});
  };
  const login = () => props.navigation.navigate('Login');
  return (
    <SafeAreaView className="h-full">
      <Appbar.Header mode="center-aligned" elevated={true}>
        <Appbar.BackAction onPress={login} />
        <Appbar.Content title="Nickname" />
      </Appbar.Header>
      <View className="flex-1 items-center justify-center p-4">
        <Text
          variant="displaySmall"
          className="font-sans font-bold text-center">
          Sign up
        </Text>
        <Text variant="bodySmall" className="font-sans font-bold text-center">
          Set your nickname
        </Text>
        <View className="flex w-full p-4 space-y-6">
          <View>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Field is required !',
                },
                maxLength: {
                  value: 20,
                  message: 'Max value is 20 characters',
                },
                minLength: {
                  value: 3,
                  message: 'Min value is 3 characters',
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  label="Nickname"
                  mode="flat"
                  right={<TextInput.Icon icon="account-edit-outline" />}
                />
              )}
              name="nickname"
            />
            {errors.nickname && (
              <Text className="text-red-600">{errors.nickname?.message}</Text>
            )}
          </View>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NicknameScreen;
