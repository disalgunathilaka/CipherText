/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {
  Avatar,
  Provider,
  List,
  Title,
  Caption,
  Divider,
  Text,
  Portal,
  Modal,
  Searchbar,
  Card,
  Button,
} from 'react-native-paper';
import {useChats} from '../hooks/converstations/use-chats';
import {FAB, Icon} from 'react-native-elements';
import {useUserSearchEmail} from '../hooks/users/search-user';
import {useCreateChatMutation} from '../hooks/converstations/use-create-chat';
import {useGetCurrentUser} from '../hooks/auth/get-current-user';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';

const ChatList = ({navigation}: any) => {
  const chats = useChats('accepted');

  const [visible, setVisible] = React.useState(false);
  const [addedUser, setAddedUser] = React.useState<any>(null);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    const refetch = async () => {
      await chats.refetch();
      setRefreshing(false);
    };

    setRefreshing(true);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [searchQuery, setSearchQuery] = React.useState('');

  const searchUserMutation = useUserSearchEmail();
  const createChatMutation = useCreateChatMutation();
  const currentUser = useGetCurrentUser();

  const onChangeSearch = async (query: string) => {
    setSearchQuery(query);
    await searchUserMutation.mutateAsync(query);
  };

  const createChat = async () => {
    const data = {
      name: `${addedUser?.firstName} ${currentUser.data.firstName}`,
      users: [addedUser.id],
    };

    await createChatMutation.mutateAsync(data);
    hideModal();
  };

  return (
    <Provider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            padding: 15,
            backgroundColor: 'white',
            margin: 10,
            borderRadius: 10,
          }}>
          <Text variant="bodyLarge">Create new chat</Text>

          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            loading={searchUserMutation.isLoading}
            value={searchQuery}
            style={{marginTop: 10, borderRadius: 10}}
            showDivider={true}
          />

          {searchUserMutation.data && (
            <>
              {searchUserMutation.data.user ? (
                <Card.Title
                  title={`${searchUserMutation.data.user.firstName} ${searchUserMutation.data.user.lastName}`}
                  left={props => (
                    <Avatar.Text
                      {...props}
                      label={searchUserMutation.data.user.firstName[0]}
                    />
                  )}
                  right={props => (
                    <Icon
                      {...props}
                      name="add"
                      color={'black'}
                      onPress={() => {
                        setAddedUser(searchUserMutation.data.user);
                      }}
                    />
                  )}
                />
              ) : (
                <Text variant="bodyLarge" style={{padding: 10}}>
                  No results
                </Text>
              )}
            </>
          )}

          {currentUser.data && (
            <>
              {addedUser && (
                <Button
                  mode="contained-tonal"
                  onPress={createChat}
                  loading={createChatMutation.isLoading}
                  style={{
                    marginTop: 20,
                  }}>
                  Create chat
                </Button>
              )}
            </>
          )}
        </Modal>
      </Portal>

      <SafeAreaView style={styles.container}>
        <ScrollView
          style={{height: '100%'}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
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
                      left={() => (
                        <>
                          <Avatar.Image
                            size={40}
                            key={chat._id}
                            source={{
                              uri: `https://robohash.org/${chat.users[0].userId._id}`,
                            }}
                          />
                        </>
                      )}
                      right={() => (
                        <Caption key={new Date(chat.createdAt).toDateString()}>
                          {new Date(chat.createdAt).toDateString()}
                        </Caption>
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
        </ScrollView>
        <FAB
          placement="right"
          color="#651fff"
          onPress={showModal}
          size="large"
          icon={<Icon name="add" color={'white'} />}
        />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  conversations: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    paddingLeft: 20,
  },
  conversationsTitle: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ChatList;
