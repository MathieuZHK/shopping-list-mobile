import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import {Appbar, Button, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

interface EmailScreenProps {
  navigation: any;
  route: any;
}

interface FormData {
  email: string;
}

const EmailScreen = (props: EmailScreenProps) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: FormData) => {
    props.navigation.navigate('Password', {
      email: data.email,
      nickname: props.route.params.nickname,
    });
  };
  const onPressBack = () => props.navigation.navigate('Nickname');
  return (
    <SafeAreaView className="h-full">
      <Appbar.Header mode="center-aligned" elevated={true}>
        <Appbar.BackAction onPress={onPressBack} />
        <Appbar.Content title="E-mail" />
      </Appbar.Header>
      <View className="flex-1 items-center justify-center p-4">
        <Text
          variant="displaySmall"
          className="font-sans font-bold text-center">
          Sign up
        </Text>
        <Text variant="bodySmall" className="font-sans font-bold text-center">
          Set your e-mail
        </Text>
        <View className="flex w-full p-4 space-y-6">
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
                  label="E-mail"
                  mode="flat"
                  right={<TextInput.Icon icon="email-edit-outline" />}
                />
              )}
              name="email"
            />
            {errors.email && (
              <Text className="text-red-600">{errors.email?.message}</Text>
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

export default EmailScreen;
