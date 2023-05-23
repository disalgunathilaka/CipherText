/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {useSignUpMutation} from '../hooks/auth/use-signup';

export function RegisterScreen({navigation}: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLasttName] = React.useState('');

  const signUpMutation = useSignUpMutation();

  const signUp = async () => {
    try {
      const result = await signUpMutation.mutateAsync({
        email,
        password,
        firstName,
        lastName,
      });

      if (!result) {
        ToastAndroid.show('Enable to register', ToastAndroid.SHORT);
        return;
      }
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account!</Text>
      <View style={styles.form}>
        <TextInput
          label="First name"
          value={firstName}
          onChangeText={setFirstName}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
          textContentType="name"
        />

        <TextInput
          label="Last name"
          value={lastName}
          onChangeText={setLasttName}
          mode="outlined"
          style={styles.input}
          autoCapitalize="none"
          textContentType="name"
        />

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
          onPress={signUp}
          style={styles.button}
          loading={signUpMutation.isLoading}>
          Sign Up
        </Button>

        <Text
          style={{
            marginTop: 10,
          }}>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{
              color: '#1890FF',
              fontWeight: 'bold',
            }}>
            Login
          </Text>
        </Text>
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
