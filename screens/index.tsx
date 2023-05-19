/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Dimensions, View} from 'react-native';
import {useUserChildrens} from '../hooks/users/use-children';
import {
  ActivityIndicator,
  MD2Colors,
  Avatar,
  Divider,
  List,
} from 'react-native-paper';
import {UserChildren} from '../types/user-children';
import {LineChart} from 'react-native-chart-kit';

export function HomeScreen({route, navigation}: any) {
  const {userId} = route.params as {userId: string};

  const {data, isLoading} = useUserChildrens(userId) as {
    data: UserChildren;
    isLoading: boolean;
  };

  return (
    <View style={{padding: 10}}>
      {isLoading && (
        <ActivityIndicator animating={true} color={MD2Colors.red800} />
      )}

      {data && (
        <>
          {data.map(child => {
            return (
              <>
                <List.Item
                  key={child._id}
                  title={`${child.firstName} ${child.lastName}`}
                  description={`Click here to view details about ${child.firstName}`}
                  onPress={() =>
                    navigation.navigate('Details', {
                      child: child,
                    })
                  }
                  left={_props => (
                    <Avatar.Text
                      key={child._id}
                      size={40}
                      label={`${child.firstName.charAt(
                        0,
                      )}${child.lastName.charAt(0)}`}
                    />
                  )}
                />
                <Divider />
              </>
            );
          })}
        </>
      )}
    </View>
  );
}
