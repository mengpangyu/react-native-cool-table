import Cell from './components/Cell';
import Row from './components/Row';
import MainTable from './components/Table';
import Sort from './components/Sort';
import { ITableComponentType } from './types/index';
export type {
  ITableProps,
  ITableCellProps,
  ITableColumn,
  ITableColumnParams,
  ITableRowProps,
  TSortType,
  ITableSortProps,
} from './types/index';
import { SORT_STATUS_MAP } from './constant';

const TableTemp: any = MainTable;
TableTemp.sortStatus = SORT_STATUS_MAP;
TableTemp.Cell = Cell;
TableTemp.Row = Row;
TableTemp.Cell = Sort;

const CoolTable = TableTemp as ITableComponentType;

export { Cell, Row, Sort };
export default CoolTable;
