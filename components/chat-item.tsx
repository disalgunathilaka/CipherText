/* eslint-disable react/react-in-jsx-scope */
import {Caption, List} from 'react-native-paper';
import {IMessage} from '../types/messages';
import {StyleSheet} from 'react-native';
import {KeyPair} from '../types/chat';
import {decrypt} from '../utils/crypto';
import {timeSince} from '../utils/days-ago';

interface IChatItemProps {
  message: IMessage;
  keyPair: KeyPair;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export const ChatItem = ({message, keyPair, user}: IChatItemProps) => {
  return (
    <List.Item
      key={message._id}
      title={decrypt(message.text, keyPair.privateKey)}
      description={<Caption>{timeSince(new Date(message.createdAt))}</Caption>}
      titleStyle={[
        styles.message,
        message.sendBy === user.id
          ? styles.sentMessage
          : styles.receivedMessage,
      ]}
    />
  );
};

const styles = StyleSheet.create({
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
});
