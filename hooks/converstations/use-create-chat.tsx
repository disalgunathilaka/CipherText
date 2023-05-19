import {useMutation} from '@tanstack/react-query';
import {request} from '../../utils/request';

export const useCreateChatMutation = () => {
  return useMutation(
    (data: {name: string; users: string[]}) =>
      request(
        {
          path: 'chat/create',
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
