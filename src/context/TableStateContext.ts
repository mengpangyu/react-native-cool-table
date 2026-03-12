import { createContext, useContext } from 'react';
import type { ITableStateContextValue } from '../types';

export const TableStateContext = createContext<ITableStateContextValue>(
  null as unknown as ITableStateContextValue
);

export const useTableState = () => useContext(TableStateContext);
