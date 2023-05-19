import {IChat} from '../../types/chat';
import {request} from '../../utils/request';
import {useQuery} from '@tanstack/react-query';

export function useChats(status: 'accepted' | 'pending') {
  return useQuery<IChat[]>(['chats', status], () =>
    request(
      {
        path: `chat/${status}`,
        method: 'GET',
      },
      null,
      true,
    ),
  );
}
