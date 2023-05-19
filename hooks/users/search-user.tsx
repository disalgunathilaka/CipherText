import {useMutation} from '@tanstack/react-query';
import {request} from '../../utils/request';

export const useUserSearchEmail = () => {
  return useMutation(
    (email: string) =>
      request(
        {
          path: `users/email/search`,
          method: 'POST',
        },
        {
          email,
        },
        true,
      ),
    {
      onSuccess: results => {
        console.log(results);
      },
    },
  );
};
