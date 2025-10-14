import React, { memo } from 'react';
import { View } from 'react-native';
import type { ITableSortProps } from '../../types';
import styles from './styles';

const Sort = ({
  sortStatus,
  style,
  ascIconProps,
  descIconProps,
}: ITableSortProps) => {
  return (
    <View style={[styles.container, style]}>
      {/* 向上箭头 */}
      <View
        style={[
          styles.triangle,
          styles.triangleUp,
          sortStatus === 'asc' && styles.triangleActive,
          ascIconProps?.style,
        ]}
      />
      {/* 向下箭头 */}
      <View
        style={[
          styles.triangle,
          styles.triangleDown,
          sortStatus === 'desc' && styles.triangleActive,
          descIconProps?.style,
        ]}
      />
    </View>
  );
};

export default memo(Sort);
