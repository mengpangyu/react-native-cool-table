import Cell from './components/Cell';
import Row from './components/Row';
import MainTable from './components/Table';
import Sort from './components/Sort';
import type { ITableComponentType } from './types/index';
export type {
  ITableProps,
  ITableCellProps,
  ITableColumn,
  ITableColumnParams,
  ITableRowProps,
  TSortType,
  TSortState,
  ITableSortProps,
  ITableStaticContextValue,
  ITableStateContextValue,
} from './types/index';
export { useTableStatic, useTableState } from './context';
import { SORT_STATUS_MAP } from './constant';

const TableTemp: any = MainTable;
TableTemp.sortStatus = SORT_STATUS_MAP;
TableTemp.Cell = Cell;
TableTemp.Row = Row;
TableTemp.Sort = Sort;

const CoolTable = TableTemp as ITableComponentType;

export { Cell, Row, Sort };
export default CoolTable;
