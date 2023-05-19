import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ChatList from './screens';
import {LoginScreen} from './screens/login';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ChatScreen from './screens/conversation-details';
import {SettingsScreen} from './screens/settings';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
};

const queryClient = new QueryClient();

function App(): JSX.Element {
  return (
    <PaperProvider theme={theme}>
      <Toast />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              header: () => <></>,
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={ChatList} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}

export default App;
