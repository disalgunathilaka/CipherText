import {IMessage} from '../../types/messages';
import {request} from '../../utils/request';
import {useQuery} from '@tanstack/react-query';

export function useMessages(id: string) {
  return useQuery<IMessage[]>(['messages', id], () =>
    request(
      {
        path: `messages/${id}`,
        method: 'GET',
      },
      null,
      true,
    ),
  );
}
