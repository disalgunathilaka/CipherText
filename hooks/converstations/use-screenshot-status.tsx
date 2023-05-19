import {useMutation} from '@tanstack/react-query';
import {request} from '../../utils/request';

export const useDisableChatScreenShotMutation = (chatId: string) => {
  return useMutation(
    (data: {status: boolean}) =>
      request(
        {
          path: `chat/update/screenshot-status/${chatId}`,
          method: 'PUT',
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
