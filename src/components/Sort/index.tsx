import React, { memo } from 'react';
import { View } from 'react-native';
import { ITableSortProps } from '../../types';
import Icon from '../Icon';
import styles from './styles';

const Sort = ({
  sortStatus,
  style,
  ascIconProps,
  descIconProps,
}: ITableSortProps) => {
  return (
    <View style={style}>
      <Icon type="TriangleUp" style={styles.up_icon} {...ascIconProps} />
      <Icon type="TriangleDown" {...descIconProps} />
    </View>
  );
};

export default memo(Sort);
