import {request} from '../../utils/request';
import {useQuery} from '@tanstack/react-query';

export function useChild(id: string) {
  return useQuery(['children', id], () =>
    request(
      {
        path: `children/${id}`,
        method: 'GET',
      },
      null,
      true,
    ),
  );
}
