import { createContext } from 'react';
import { Locale } from './index';

const LocaleContext = createContext<Partial<Locale> | undefined>(undefined);

export default LocaleContext;
