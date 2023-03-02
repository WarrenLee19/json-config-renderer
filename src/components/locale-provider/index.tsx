import * as React from 'react';
import LocaleContext from './context';

export interface Locale {
  locale: string;
}

export interface LocaleProviderProps {
  locale: Locale;
  children?: React.ReactNode;
}

/**
 * 语言提供者
 * @param props
 * @constructor
 */
export default function LocaleProvider(props: LocaleProviderProps) {
  const { locale, children } = props;
  return <LocaleContext.Provider value={{ ...locale }}>{children}</LocaleContext.Provider>;
}
