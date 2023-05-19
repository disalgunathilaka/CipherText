import {request} from '../../utils/request';
import {useQuery} from '@tanstack/react-query';

export function useUserChildrens(id: string) {
  return useQuery(['users/children', id], () =>
    request(
      {
        path: `users/children/${id}`,
        method: 'GET',
      },
      null,
      true,
    ),
  );
}
