/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {View} from 'react-native';
import {IChild} from '../types/user-children';

const LeftContent = (props: {firstName: string; lastName: string}) => {
  return (
    <Avatar.Text
      size={40}
      label={`${props.firstName.charAt(0)}${props.lastName.charAt(0)}`}
    />
  );
};

export const ChildDeatils = ({route, navigation}: any) => {
  const {child} = route.params as {child: IChild};
  return (
    <>
      <View style={{padding: 10, marginTop: 12}}>
        <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
          Details about {child.firstName}
        </Text>

        <Card style={{marginTop: 20}} mode="outlined">
          <Card.Title
            title={`${child.firstName} ${child.lastName}`}
            left={() => {
              return (
                <LeftContent
                  firstName={child.firstName}
                  lastName={child.lastName}
                />
              );
            }}
          />
          <Card.Content>
            <Text variant="bodyMedium">
              {`here you can find the Information about ${child.firstName}, the uptodate information added by the nurse `}
            </Text>
          </Card.Content>
          <Card.Cover
            source={{uri: 'https://picsum.photos/700'}}
            style={{padding: 10, backgroundColor: 'white', marginBottom: 10}}
          />
        </Card>
      </View>
    </>
  );
};
