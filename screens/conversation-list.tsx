import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Appbar,
  Avatar,
  Button,
  Caption,
  List,
  TextInput,
} from 'react-native-paper';

const ChatScreen = ({navigation}: any) => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([
    {id: 1, content: 'Hey, how are you?', sender: 'user', time: '9:00 AM'},
    {
      id: 2,
      content: "I'm good, thanks for asking!",
      sender: 'other',
      time: '9:01 AM',
    },
    {
      id: 3,
      content: 'What are you up to today?',
      sender: 'other',
      time: '9:02 AM',
    },
    {
      id: 4,
      content: 'Not much, just some work. How about you?',
      sender: 'user',
      time: '9:03 AM',
    },
    {
      id: 5,
      content: "I'm going to the beach with some friends!",
      sender: 'other',
      time: '9:04 AM',
    },
  ]);

  const handleSendMessage = () => {
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        content: inputValue,
        sender: 'user',
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setInputValue('');
  };

  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Avatar.Text size={40} label="J" />
        <Appbar.Content title="John" />
      </Appbar.Header>
      <List.Section style={styles.messageList}>
        {messages.map(message => (
          <List.Item
            key={message.id}
            title={message.content}
            description={<Caption>{message.time}</Caption>}
            titleStyle={[
              styles.message,
              message.sender === 'user'
                ? styles.sentMessage
                : styles.receivedMessage,
            ]}
          />
        ))}
      </List.Section>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message here"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <Button onPress={handleSendMessage}>Send </Button>
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
