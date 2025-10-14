import React from 'react';
import { View, ViewStyle } from 'react-native';
import CoolTable, { ITableColumn } from 'react-native-cool-table';
import { commonStyles } from '../styles/commonStyles';

interface TableContainerProps {
  data: any[];
  columns: ITableColumn[];
  onSortChange?: (params: { key: string; colIndex: number; sort: any }) => void;
  onPressRow?: (params: { item: any; rowIndex: number }) => void;
  treeConfig?: any;
  style?: ViewStyle;
  flex?: boolean;
  EmptyComponent?: React.ReactNode;
  [key: string]: any; // 其他 CoolTable 属性
}

const TableContainer: React.FC<TableContainerProps> = ({
  data,
  columns,
  onSortChange,
  onPressRow,
  treeConfig,
  style,
  flex = false,
  EmptyComponent,
  ...otherProps
}) => {
  return (
    <View
      style={[
        flex ? commonStyles.tableContainerFlex : commonStyles.tableContainer,
        style,
      ]}
    >
      <CoolTable
        data={data}
        columns={columns}
        onSortChange={onSortChange}
        onPressRow={onPressRow}
        treeConfig={treeConfig}
        style={commonStyles.table}
        rowStyle={commonStyles.row}
        headerRowStyle={commonStyles.headerRow}
        EmptyComponent={EmptyComponent}
        {...otherProps}
      />
    </View>
  );
};

export default TableContainer;
