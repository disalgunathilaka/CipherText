import {request} from '../../utils/request';
import {useQuery} from '@tanstack/react-query';

export function useGetCurrentUser() {
  return useQuery(['current-user'], () =>
    request(
      {
        path: 'auth/me',
        method: 'GET',
      },
      null,
      true,
    ),
  );
}
