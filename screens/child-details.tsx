/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {Dimensions, ScrollView} from 'react-native';
import {IChild} from '../types/user-children';
import {LineChart} from 'react-native-chart-kit';

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
    <ScrollView style={{padding: 10}}>
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

      <Text variant="headlineSmall" style={{fontWeight: 'bold', marginTop: 20}}>
        Child Height Information
      </Text>

      <LineChart
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: child.attributes.height.map(
                ({value}: {value: number}) => value,
              ),
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={{
          marginTop: 20,
          borderRadius: 16,
        }}
      />

      <Text variant="headlineSmall" style={{fontWeight: 'bold', marginTop: 20}}>
        Child Weight Information
      </Text>

      <LineChart
        data={{
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'June',
            'July',
            'Aug',
            'Sept',
            'Oct',
            'Nov',
            'Dec',
          ],
          datasets: [
            {
              data: child.attributes.weight.map(
                ({value}: {value: number}) => value,
              ),
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={{
          marginTop: 20,
          borderRadius: 16,
        }}
      />

      <Text style={{marginBottom: 20}}>{''}</Text>
    </ScrollView>
  );
};
