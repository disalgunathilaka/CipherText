import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from './screens';
import {LoginScreen} from './screens/login';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import ApplicationNavigationBar from './components/app-bar';
import Toast from 'react-native-toast-message';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ChildDeatils} from './screens/child-details';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
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
              header: props => <ApplicationNavigationBar {...props} />,
            }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={ChildDeatils} />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </PaperProvider>
  );
}

export default App;
