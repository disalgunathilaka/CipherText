import {useMutation} from '@tanstack/react-query';
import {request} from '../../utils/request';

export const useSendMessage = () => {
  return useMutation(
    (data: {text: string; chatId: string; lat: number; lng: number}) =>
      request(
        {
          path: 'messages/create',
          method: 'POST',
        },
        data,
        true,
      ),
    {
      onSuccess: results => {
        console.log(results);
      },
    },
  );
};
