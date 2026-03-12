import { createContext, useContext } from 'react';
import type { ITableStaticContextValue } from '../types';

export const TableStaticContext = createContext<ITableStaticContextValue>(
  null as unknown as ITableStaticContextValue
);

export const useTableStatic = () => useContext(TableStaticContext);
