import {ChatLocationForUser} from '../../types/location';
import {request} from '../../utils/request';
import {useQuery} from '@tanstack/react-query';

export function useChatLocation(id: string) {
  return useQuery<ChatLocationForUser[]>(['chat-location', id], () =>
    request(
      {
        path: `chat/location/${id}`,
        method: 'GET',
      },
      null,
      true,
    ),
  );
}
