import {useMutation, useQueryClient} from '@tanstack/react-query';
import {request} from '../../utils/request';

export const useSignUpMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) =>
      request(
        {
          path: 'users/create',
          method: 'POST',
        },
        data,
        true,
      ),
    {
      onSuccess: tokens => {
        queryClient.setQueryData(['token'], tokens);
      },
    },
  );
};
