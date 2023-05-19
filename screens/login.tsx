/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {useSignInMutation} from '../hooks/auth/use-sign-in';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {storeData} from '../utils/store';
import {StoreEnum} from '../enum/store-enum';

export function LoginScreen({navigation}: any) {
  const [email, setEmail] = React.useState('dasith2@test');
  const [password, setPassword] = React.useState('password');
  const signInMutation = useSignInMutation();

  const signIn = async () => {
    try {
      const result = await signInMutation.mutateAsync({email, password});

      if (!result) {
        ToastAndroid.show('Unauthozied', ToastAndroid.SHORT);
        return;
      }
      await storeData({key: StoreEnum.AUTH_TOKEN, value: result.token});
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      <View style={styles.form}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          style={styles.input}
          secureTextEntry
          autoCapitalize="none"
          textContentType="password"
        />
        <Button
          mode="contained"
          onPress={signIn}
          style={styles.button}
          loading={signInMutation.isLoading}>
          Log In
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  form: {
    width: '80%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  button: {
    width: '100%',
    borderRadius: 5,
    marginTop: 16,
    backgroundColor: '#6200ee',
  },
});
