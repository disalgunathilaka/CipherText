import React, {useState} from 'react';
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
import {IChat} from '../types/chat';
import {useChatLocation} from '../hooks/converstations/use-location';
import MapView, {Marker} from 'react-native-maps';
import {useDisableChatScreenShotMutation} from '../hooks/converstations/use-screenshot-status';

export const ChatInformationScreen = ({route, navigation}: any) => {
  const {_id, name, dissabledScreenShots} = route.params as IChat;
  const [isDisabled, setIsDisabled] = useState(
    dissabledScreenShots ? dissabledScreenShots : false,
  );
  const disableChatMutatin = useDisableChatScreenShotMutation(_id);
  const user = useGetCurrentUser();
  const info = useChatLocation(_id);

  const disableChatSS = async () => {
    await disableChatMutatin.mutateAsync({
      status: isDisabled,
    });
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title={`${name} details`} />
      </Appbar.Header>

      <View style={styles.profileContainer}>
        {!user.data ? (
          <Button onPress={() => {}} loading={true}>
            Loading
          </Button>
        ) : (
          <>
            <View style={styles.profileHeader}>
              <Avatar.Image
                key={_id}
                source={{
                  uri: `https://robohash.org/${_id}`,
                }}
                size={64}
              />
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.mapView}>
              {info.data && (
                <>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: 0,
                      longitude: 0,
                      latitudeDelta: 0.1,
                      longitudeDelta: 0.1,
                    }}>
                    {info.data.map(({userId, user, lastMessageLocation}) => (
                      <Marker
                        key={userId}
                        coordinate={{
                          latitude: lastMessageLocation.lat,
                          longitude: lastMessageLocation.lng,
                        }}>
                        <Avatar.Image
                          size={30}
                          source={{uri: `https://robohash.org/${user.id}`}}
                        />
                      </Marker>
                    ))}
                  </MapView>
                </>
              )}
            </View>

            <View style={styles.form}>
              <TextInput
                label="Email"
                value={user.data.email}
                disabled={true}
              />
              <View style={styles.spacer} />
              <Text style={styles.label}>Chat Options</Text>
              <View style={styles.option}>
                <Text style={styles.optionLabel}>Disable Screenshots</Text>
                <Switch
                  value={isDisabled}
                  onValueChange={() => setIsDisabled(!isDisabled)}
                />
              </View>
              {/* Add two more options here */}
              <View style={styles.spacer} />
              <Button
                mode="contained"
                onPress={() => disableChatSS()}
                loading={disableChatMutatin.isLoading}>
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
  map: {
    flex: 1,
  },
  mapView: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 20,
  },
});
