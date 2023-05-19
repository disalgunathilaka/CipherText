/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, List, Title, Caption, Divider} from 'react-native-paper';

const chatList = [
  {
    id: 1,
    name: 'John Doe',
    message: 'Hey, how are you?',
    time: '12:30 PM',
  },
  {
    id: 2,
    name: 'Jane Smith',
    message: 'I am fine, thanks for asking.',
    time: '1:45 PM',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    message: 'What are you up to today?',
    time: '2:30 PM',
  },
];

const ChatList = ({navigation}: any) => {
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
        {chatList.map(chat => (
          <>
            <List.Item
              key={chat.id}
              title={chat.name}
              description={chat.message}
              left={() => <Avatar.Text size={40} label={chat.name[0]} />}
              right={() => <Caption>{chat.time}</Caption>}
              onPress={() =>
                navigation.navigate('ChatScreen', {
                  userId: '1234',
                })
              }
            />
            <Divider />
          </>
        ))}
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
