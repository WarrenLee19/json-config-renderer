import { ConfigConsumerProps, ConfigContext } from '../components';
import { useContext } from 'react';

/**
 * 功能：封装内置请求
 */
export function useRequest() {
  const { axiosInstance } = useContext<ConfigConsumerProps>(ConfigContext);

  return { axiosInstance } as Required<ConfigConsumerProps>;
}
