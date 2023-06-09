import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  IconButton,
  List,
  Searchbar,
} from 'react-native-paper';
import {IChat} from '../types/chat';
import {useMessages} from '../hooks/messages/use-messages';
import {ChatItem} from '../components/chat-item';
import {useSendMessage} from '../hooks/messages/send-messages';
import {encrypt} from '../utils/crypto';
import Geolocation from '@react-native-community/geolocation';
import {useGetCurrentUser} from '../hooks/auth/get-current-user';
import forge from 'node-forge';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeModules} from 'react-native';

const ChatScreen = ({route, navigation}: any) => {
  const {_id, name, keyPair, dissabledScreenShots} = route.params as IChat;
  const [inputValue, setInputValue] = useState('');
  const messageList = useMessages(_id);
  const sendMessageMutation = useSendMessage();
  const user = useGetCurrentUser();

  const handleSendMessage = async () => {
    // Get the user's current location
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;

        const publicKeyObj = forge.pki.publicKeyFromPem(keyPair.publicKey);

        // Encrypt the message using the public key
        const value = encrypt(inputValue, publicKeyObj);

        // Send the message with the current location
        await sendMessageMutation.mutateAsync({
          text: value,
          chatId: _id,
          lat: latitude,
          lng: longitude,
        });

        // Refetch the message list and clear the input
        messageList.refetch();
        setInputValue('');
      },
      error => {
        console.log(error);
        // Handle error getting location
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  };

  useEffect(() => {
    const forbidFunction = async () => {
      try {
        const result = await NativeModules.PreventScreenshotModule.forbid();
        console.log('=== result ===');
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    };

    const allowFunction = async () => {
      try {
        const result = await NativeModules.PreventScreenshotModule.allow();
        console.log(result);
      } catch (e) {
        console.log(e);
      }
    };

    if (dissabledScreenShots) {
      console.log('=== screen shots will be forbit ===');
      forbidFunction();
    } else {
      allowFunction();
    }
  }, [dissabledScreenShots]);

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Avatar.Image
          size={40}
          key={_id}
          source={{
            uri: `https://robohash.org/${_id}`,
          }}
        />
        <Appbar.Content title={name} />

        <IconButton
          icon="information-outline"
          onPress={() => {
            navigation.navigate('ChatInfo', {
              _id,
              name,
              dissabledScreenShots,
            });
          }}
        />
      </Appbar.Header>

      <ScrollView>
        <List.Section style={styles.messageList}>
          {!user.data ? (
            <Button loading={true} mode="text">
              Loading
            </Button>
          ) : (
            <>
              {messageList.data && (
                <>
                  {messageList.data.map(message => (
                    <ChatItem
                      user={user.data}
                      message={message}
                      key={message._id}
                      keyPair={keyPair}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </List.Section>
      </ScrollView>

      <View style={styles.inputContainer}>
        <Searchbar
          style={styles.input}
          icon={'attachment'}
          onIconPress={() => {
            console.log('handle attachment upload');
          }}
          placeholder="Type your message here"
          onChangeText={setInputValue}
          value={inputValue}
        />

        {sendMessageMutation.isLoading ? (
          <Button loading={true} mode="contained-tonal">
            Sending
          </Button>
        ) : (
          <IconButton
            icon="send"
            mode="contained-tonal"
            onPress={handleSendMessage}
          />
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
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 16,
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    maxWidth: '70%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#1abc9c',
    color: '#fff',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#eaeaea',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    zIndex: 200,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#eaeaea',
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
});

export default ChatScreen;
