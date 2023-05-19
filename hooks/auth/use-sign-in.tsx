import {useMutation, useQueryClient} from '@tanstack/react-query';
import {request} from '../../utils/request';

export const useSignInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({email, password}: {email: string; password: string}) =>
      request(
        {
          path: 'auth/login',
          method: 'POST',
        },
        {
          email: email,
          password: password,
        },
        true,
      ),
    {
      onSuccess: tokens => {
        queryClient.setQueryData(['token'], tokens);
      },
    },
  );
};
