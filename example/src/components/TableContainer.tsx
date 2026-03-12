import React from 'react';
import { View } from 'react-native';
import type { ViewStyle } from 'react-native';
import CoolTable from 'react-native-cool-table';
import type { ITableProps } from 'react-native-cool-table';
import { commonStyles } from '../styles/commonStyles';

interface TableContainerProps extends Omit<ITableProps, 'style'> {
  style?: ViewStyle;
  flex?: boolean;
}

const TableContainer: React.FC<TableContainerProps> = ({
  style,
  flex = false,
  ...tableProps
}) => (
  <View
    style={[
      flex ? commonStyles.tableContainerFlex : commonStyles.tableContainer,
      style,
    ]}
  >
    <CoolTable
      style={commonStyles.table}
      rowStyle={commonStyles.row}
      headerRowStyle={commonStyles.headerRow}
      {...tableProps}
    />
  </View>
);

export default TableContainer;
