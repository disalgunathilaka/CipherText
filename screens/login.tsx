/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Card, Button, Text, TextInput} from 'react-native-paper';
import {useSignInMutation} from '../hooks/auth/use-sign-in';
import {ToastAndroid} from 'react-native';

export function LoginScreen({navigation}: any) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const signInMutation = useSignInMutation();

  const signIn = async () => {
    const result = await signInMutation.mutateAsync({email, password});

    if (result.user.role !== 'parent') {
      ToastAndroid.show('only parents can use this app', ToastAndroid.SHORT);
      return;
    }
    navigation.navigate('Home', {
      userId: result.user.id,
    });
  };

  return (
    <Card style={{margin: 20}}>
      <Card.Content>
        <Text variant="headlineSmall" style={{fontWeight: 'bold'}}>
          Welcome Back
        </Text>

        <TextInput
          label="Email"
          value={email}
          mode="outlined"
          style={{marginTop: 10}}
          onChangeText={text => setEmail(text)}
        />

        <TextInput
          label="Password"
          value={password}
          style={{
            marginTop: 10,
          }}
          mode="outlined"
          onChangeText={text => setPassword(text)}
        />
      </Card.Content>

      <Card.Actions style={{marginTop: 10}}>
        <Button
          mode="contained-tonal"
          onPress={signIn}
          loading={signInMutation.isLoading}>
          Sign-In
        </Button>
      </Card.Actions>
    </Card>
  );
}
