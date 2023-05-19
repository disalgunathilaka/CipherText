/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, List, Title, Caption, Divider} from 'react-native-paper';
import {useChats} from '../hooks/converstations/use-chats';

const ChatList = ({navigation}: any) => {
  const chats = useChats('accepted');

  return (
    <View style={styles.container}>
      <View style={styles.conversations}>
        <Title style={styles.conversationsTitle}>Conversations</Title>
      </View>
      <List.Section
        style={{
          marginLeft: 10,
          marginRight: 10,
        }}>
        {chats.data && (
          <>
            {chats.data.map(chat => (
              <>
                <List.Item
                  key={chat._id}
                  title={chat.name}
                  description={'click to view messages'}
                  left={() => <Avatar.Text size={40} label={chat.name[0]} />}
                  right={() => (
                    <Caption>{new Date(chat.createdAt).toDateString()}</Caption>
                  )}
                  onPress={() =>
                    navigation.navigate('ChatScreen', {
                      ...chat,
                    })
                  }
                />
                <Divider />
              </>
            ))}
          </>
        )}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conversations: {
    backgroundColor: '#fff',
    elevation: 3,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  conversationsTitle: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ChatList;
