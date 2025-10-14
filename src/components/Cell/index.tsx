import { isArray, isEmpty, isFunction, isNil } from 'lodash';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import type { ITableCellProps } from '../../types';
import { SORT_STATUS_MAP } from '../../constant';
import Sort from '../Sort';
import { useUpdateEffect } from '../../hooks';
import styles from './styles';

const Cell = (
  {
    val,
    col,
    row,
    rowIndex,
    colIndex,
    onSortChange,
    isHeader,
    onExpandChange,
    expanded,
    style,
  }: ITableCellProps,
  ref: any
) => {
  const {
    key,
    fixed,
    hTextStyle,
    textStyle,
    secondTextStyle,
    sortable,
    defaultSort,
    showArrow,
    touchStyle,
    onPress,
  } = col;

  const [sortStatus, setSortStatus] = useState(defaultSort);
  const isShowSort = useMemo(() => isHeader && sortable, [isHeader, sortable]);
  const isShowExpand = useMemo(
    () => !isEmpty(row.children) && !isHeader && colIndex === 0,
    [row, isHeader, colIndex]
  );
  const isShowArrow = useMemo(() => {
    return !isHeader && showArrow && !isShowExpand;
  }, [isHeader, showArrow, isShowExpand]);

  useImperativeHandle(ref, () => ({ resetSort }));

  useUpdateEffect(() => {
    if (isShowSort && isFunction(onSortChange) && sortStatus) {
      onSortChange({ colIndex, sort: sortStatus, key: col?.key ?? '' });
    }
  }, [sortStatus, isShowSort]);

  const resetSort = useCallback(() => setSortStatus(undefined), []);

  const _onPress = () => {
    if (isShowSort) {
      setSortStatus(
        sortStatus !== SORT_STATUS_MAP.asc
          ? SORT_STATUS_MAP.asc
          : SORT_STATUS_MAP.desc
      );
    } else if (isShowExpand) {
      onExpandChange?.();
    } else if (isFunction(onPress)) {
      // 最后响应外部的 onPress
      onPress({
        val,
        col,
        row,
        rowIndex,
        colIndex,
        isHeader,
      });
    }
  };

  const renderCell = () => {
    if (!isNil(val)) {
      const vals = isArray(val) ? val : [val];
      return vals.map((item, index) => {
        return (
          <Text
            key={`table-cell-${key}-${item}-${index}`}
            numberOfLines={2}
            style={[
              styles.text,
              {
                textAlign: fixed ? 'left' : 'right',
                color: isHeader ? '#929AA6' : '#1F2733',
              },
              isHeader ? hTextStyle : textStyle,
              index >= 1 && styles.second_text,
              index >= 1 && secondTextStyle,
            ]}
          >
            {item}
          </Text>
        );
      });
    }
    return null;
  };

  const renderArrow = () => {
    return isShowArrow ? (
      <View style={styles.rightArrow}>
        <View style={styles.rightArrowTriangle} />
      </View>
    ) : null;
  };

  const renderSort = () => {
    return isShowSort ? (
      <Sort style={styles.sort} sortStatus={sortStatus} />
    ) : null;
  };

  const renderExpand = () => {
    return isShowExpand ? (
      <View
        style={[
          styles.expand_icon,
          { transform: [{ rotate: expanded ? '90deg' : '0deg' }] },
        ]}
      >
        <View style={styles.expandTriangle} />
      </View>
    ) : null;
  };
  return (
    <TouchableOpacity
      style={[styles.content, style, touchStyle]}
      onPress={_onPress}
      disabled={!onPress && !isShowSort && !isShowExpand}
    >
      {renderExpand()}
      <View>{renderCell()}</View>
      {renderArrow()}
      {renderSort()}
    </TouchableOpacity>
  );
};

export default memo(forwardRef(Cell));
