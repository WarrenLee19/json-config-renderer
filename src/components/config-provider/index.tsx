import React, { createContext } from 'react';
import { Locale } from '../locale-provider';
import defaultRenderEmpty, { RenderEmptyHandler } from '../empty';
import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/http';

/**
 * 上下文属性列表
 */
export interface ConfigConsumerProps {
  locale?: Locale;
  renderEmpty?: RenderEmptyHandler;
  axiosInstance?: AxiosInstance;
}

export const ConfigContext = createContext<ConfigConsumerProps>({
  locale: { locale: 'zh' },
  renderEmpty: defaultRenderEmpty,
  axiosInstance
});

export interface ConfigProviderProps extends ConfigConsumerProps {
  children?: React.ReactNode;
}

interface ProviderChildrenProps extends ConfigProviderProps {
  parentContext: ConfigConsumerProps;
}

function ProviderChildren(props: ProviderChildrenProps) {
  const { children, parentContext } = props;

  const config = {
    ...parentContext
  };

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
}

export const ConfigConsumer = ConfigContext.Consumer;

/**
 * 上下文组件
 * @param props
 * @constructor
 */
export function ConfigProviderGlobal(props: ConfigProviderProps) {
  return <ConfigConsumer>{context => {
    return <ProviderChildren {...props} parentContext={context} />;
  }}</ConfigConsumer>;
}
