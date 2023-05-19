import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Appbar,
  Text,
  TextInput,
  Switch,
  Avatar,
  Button,
} from 'react-native-paper';
import {useGetCurrentUser} from '../hooks/auth/get-current-user';

export const SettingsScreen = ({navigation}: any) => {
  const user = useGetCurrentUser();
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={'Settings'} />
      </Appbar.Header>

      <View style={styles.profileContainer}>
        {!user.data ? (
          <Button onPress={() => {}} loading={true}>
            Loading
          </Button>
        ) : (
          <>
            <View style={styles.profileHeader}>
              <Avatar.Text
                label={`${user.data.firstName[0]}${user.data.lastName[0]}`}
                size={64}
              />
              <Text
                style={
                  styles.name
                }>{`${user.data.firstName} ${user.data.lastName}`}</Text>
            </View>
            <View style={styles.form}>
              <TextInput
                label="Email"
                value={user.data.email}
                disabled={true}
              />
              <View style={styles.spacer} />
              <Text style={styles.label}>Global Options</Text>
              <View style={styles.option}>
                <Text style={styles.optionLabel}>Disable Screenshots</Text>
                <Switch value={false} onValueChange={() => {}} />
              </View>
              {/* Add two more options here */}
              <View style={styles.spacer} />
              <Button
                mode="contained"
                onPress={() => console.log('Save button pressed')}>
                Save Changes
              </Button>
            </View>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  profileContainer: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  form: {
    flex: 1,
  },
  spacer: {
    height: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 16,
  },
});
