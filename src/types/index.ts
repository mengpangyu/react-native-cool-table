import type { MutableRefObject, ReactNode } from 'react';
import type {
  StyleProp,
  TextStyle,
  ViewStyle,
  ImageStyle,
  LayoutChangeEvent,
  Animated,
} from 'react-native';

type TAnyObject = Record<string, any>;

export type TItem = { [key: string]: any; children?: TItem[] };

export type TSortType = 'asc' | 'desc';

export interface IEmptyProps {
  description?: string;
  style?: StyleProp<ViewStyle>;
  image?: string | { uri: string };
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export interface IIconProps {
  type: string;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  source?: string | { uri: string };
}

export interface ICommonTableProps {
  style?: StyleProp<ViewStyle>;
  rowStyle?: StyleProp<ViewStyle>;
  onPressRow?: (params: { item: any; rowIndex: number }) => void;
  onSortChange?: (params: {
    key: string;
    colIndex: number;
    sort: TSortType;
  }) => void;
}

export type TExpandable = {
  rowStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  animationDuration?: number;
  autoCollapseOthers?: boolean;
  onPressRow?: (params: { item: any; rowIndex: number }) => void;
  renderItem?: (params: {
    item: TAnyObject;
    index: number;
    positionX: Animated.Value;
    columns: ITableColumn[];
    depth: number;
    defaultRender: (params: { item: TItem; index: number }) => ReactNode;
  }) => ReactNode;
  renderExpand?: (params: {
    data: TItem[];
    parentData: TItem;
    index: number;
    positionX: Animated.Value;
    columns: ITableColumn[];
    depth: number;
  }) => ReactNode;
};

export interface ITableCellProps
  extends Omit<ITableColumnParams, 'defaultRender'>,
    ICommonTableProps {
  expanded?: boolean;
  onExpandChange?: () => void;
}

export interface ITableColumnParams {
  val: string | string[]; // 单元格值
  col: ITableColumn; // 列配置
  row: TItem; // 行数据
  rowIndex: number; // 行索引
  colIndex: number; // 列索引
  defaultRender?: () => ReactNode; // 默认渲染函数
  isHeader?: boolean;
}

export interface ITableColumn {
  key: string; // 唯一标识，用来匹配数据
  title: string; // 标题
  width?: string | number; // 宽度
  align?: 'left' | 'center' | 'right'; // 对其方式
  style?: StyleProp<ViewStyle>; // 单元格样式
  textStyle?: StyleProp<TextStyle>; // 单元格文字样式
  hStyle?: StyleProp<ViewStyle>; // 头部样式
  hTextStyle?: StyleProp<TextStyle>; // 头部文字样式
  keySplitSymbol?: string; // key分隔符
  fixed?: boolean;
  secondTextStyle?: StyleProp<TextStyle>; // 单元格第二层文本的style
  showArrow?: boolean; // 是否显示箭头
  touchStyle?: StyleProp<ViewStyle>; // 点击区域style;
  onPress?: (params: Omit<ITableColumnParams, 'defaultRender'>) => void; // 点击
  render?: (params: ITableColumnParams) => ReactNode; // 渲染body
  renderHeader?: (params: ITableColumnParams) => ReactNode; // 渲染头部
  sortable?: boolean;
  onSort?: () => void;
  defaultSort?: TSortType;
  customVal?: (
    params: Omit<ITableColumnParams, 'defaultRender'>
  ) => string | string[];
}

export interface ITableProps extends ICommonTableProps {
  data: TItem[];
  columns: ITableColumn[];
  headerRowStyle?: StyleProp<ViewStyle>;
  FooterComponent?: React.ReactNode;
  EmptyComponent?: React.ReactNode;
  flatListProps?: React.ComponentType<any> | React.ReactElement | null;
  emptyWrapperStyle?: StyleProp<ViewStyle>;
  emptyProps?: IEmptyProps;
  treeConfig?: TExpandable;
  onLayout?: (e: LayoutChangeEvent) => void;
  keyExtractor?: (item: TItem, index: number) => string;
}

export interface ITableRowProps extends ICommonTableProps {
  columns: ITableColumn[];
  data: TItem;
  rowIndex: number;
  positionX: Animated.Value;
  isHeader?: boolean;
  treeConfig?: TExpandable;
  depth?: number;
  onExpandChange?: (expanded: boolean, rowIndex: number) => void;
}

export interface ITableCellProps
  extends Omit<ITableColumnParams, 'defaultRender'>,
    ICommonTableProps {
  expanded?: boolean;
  onExpandChange?: () => void;
}

export interface ITableSortProps {
  sortStatus?: TSortType;
  style?: StyleProp<ViewStyle>;
  ascIconProps?: IIconProps;
  descIconProps?: IIconProps;
}

export type ITableComponentType = ((
  props: ITableProps & { ref?: MutableRefObject<any> }
) => JSX.Element) & {
  Cell: React.MemoExoticComponent<
    (props: ITableCellProps & { ref?: MutableRefObject<any> }) => JSX.Element
  >;
  Row: React.MemoExoticComponent<
    (props: ITableRowProps & { ref?: MutableRefObject<any> }) => JSX.Element
  >;
  Sort: React.MemoExoticComponent<(props: ITableSortProps) => JSX.Element>;
  sortStatus: Record<string, TSortType>;
};
