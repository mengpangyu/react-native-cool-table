import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
  LayoutAnimation,
  ScrollView,
} from 'react-native';
import { ITableRowProps, TItem, TSortType } from '../../types';
import { isArray, isEmpty, isFunction, isNil } from 'lodash';
import { ALIGN_MAP } from '../../constant';
import Cell from '../Cell';
import { useUpdateEffect } from '../../hooks';
import styles from './styles';

const Row = (
  {
    style,
    columns,
    data,
    rowIndex,
    isHeader,
    positionX,
    onSortChange,
    treeConfig,
    onPressRow,
    rowStyle,
    depth = 1,
    onExpandChange,
  }: ITableRowProps,
  ref: any
) => {
  const cellRefs = useRef<any[]>([]);
  const [expanded, setExpanded] = useState(false);
  const nextExpandable = useMemo(() => {
    return !isEmpty(data?.children) && treeConfig ? treeConfig : undefined;
  }, [treeConfig, data?.children]);
  const hasHeaderMultipleLine = useMemo(() => {
    return isHeader && Object.keys(data).some((item) => item.includes('/'));
  }, [isHeader, data]);

  // NOTE: 嵌套的Row会导致此Hooks报错，在功能上也不需要嵌套多层的ref，所以只在第一层级使用Ref
  useImperativeHandle(depth === 1 ? ref : undefined, () => ({
    collapse: () => _onExpandChange(false),
  }));

  useUpdateEffect(() => {
    onExpandChange?.(expanded, rowIndex);
  }, [expanded]);

  const _onPressRow = useCallback(() => {
    onPressRow?.({ item: data, rowIndex });
  }, [onPressRow, data, rowIndex]);

  const _onExpandChange = useCallback(
    (status?: boolean) => {
      if (isNil(status)) {
        setExpanded((prev) => !prev);
      } else {
        setExpanded(status);
      }
      // 折叠触发layout动画
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          treeConfig?.animationDuration ?? 200,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )
      );
    },
    [treeConfig]
  );

  const _onSortChange = useCallback(
    ({
      key,
      colIndex,
      sort,
    }: {
      key: string;
      colIndex: number;
      sort: TSortType;
    }) => {
      if (!isEmpty(cellRefs.current)) {
        cellRefs.current.forEach((item, index) => {
          if (index !== colIndex) {
            item?.resetSort?.();
          }
        });
      }
      onSortChange?.({
        key,
        colIndex,
        sort,
      });
    },
    [onSortChange, cellRefs]
  );

  const renderColumns = () => {
    if (isArray(columns) && !isEmpty(columns)) {
      return columns.map((column, colIndex, arr) => {
        const {
          key = '',
          keySplitSymbol = '/',
          width,
          align = 'right',
          render,
          style: cStyle,
          hStyle,
          fixed,
          customVal,
        } = column;

        const commonParams = {
          col: column,
          row: data,
          rowIndex,
          colIndex,
          isHeader,
        };

        const isFirst = colIndex === 0;
        const isLast = colIndex === arr.length - 1;

        const cellStyle = isHeader ? hStyle : cStyle;

        const keys = isHeader ? [key] : key.split(keySplitSymbol);
        const values = keys.map((item) => data[item as keyof typeof data]);
        let value = values.length <= 1 ? values?.[0] : values;

        if (isFunction(customVal)) {
          value = customVal({ val: value, ...commonParams });
        }

        const alignRes = ALIGN_MAP[fixed || isFirst ? 'left' : align];

        const _cellStyle: ViewStyle[] = [
          styles.cell,
          hasHeaderMultipleLine
            ? styles.cell_multiple_line
            : styles.justify_center,
          { paddingLeft: isFirst ? 0 : 16, paddingRight: isLast ? 0 : 16 },
        ];
        if (width) {
          _cellStyle.push({ width });
        }
        if (alignRes) {
          _cellStyle.push({ alignItems: alignRes });
        }

        const defaultRender = () => {
          return (
            <Cell
              ref={(ref) => (cellRefs.current[colIndex] = ref)}
              val={value}
              onSortChange={_onSortChange}
              onExpandChange={_onExpandChange}
              expanded={expanded}
              style={
                depth > 1 && colIndex === 0
                  ? { paddingLeft: 8 * (depth - 1) }
                  : {}
              }
              {...commonParams}
            />
          );
        };

        const cell = isFunction(render)
          ? render({ val: value, defaultRender, ...commonParams })
          : defaultRender();

        return fixed ? (
          <Animated.View
            key={`table-column-${rowIndex}-${colIndex}`}
            style={[
              styles.fixed_cell,
              { transform: [{ translateX: positionX }] },
              _cellStyle,
              cellStyle,
            ]}
          >
            {cell}
          </Animated.View>
        ) : (
          <View
            key={`table-column-${rowIndex}-${colIndex}`}
            style={[_cellStyle, cellStyle]}
          >
            {cell}
          </View>
        );
      });
    }
    return null;
  };

  const renderSeparator = () => {
    return !isHeader ? <View style={styles.separator} /> : null;
  };

  const renderItem = ({ item, index }: { item: TItem; index: number }) => (
    <Row
      key={`table-row-${JSON.stringify(item).slice(-1000)}-${index}`}
      style={treeConfig?.rowStyle ?? rowStyle}
      onPressRow={treeConfig?.onPressRow ?? onPressRow}
      data={item}
      rowIndex={index}
      columns={columns}
      isHeader={false}
      positionX={positionX}
      treeConfig={nextExpandable}
      depth={depth + 1}
    />
  );

  const renderExpand = () => {
    if (!isEmpty(data?.children) && expanded) {
      if (isFunction(treeConfig?.renderExpand)) {
        return treeConfig?.renderExpand({
          data: data?.children!,
          parentData: data,
          index: rowIndex,
          positionX,
          columns,
          depth,
        });
      }
      return (
        <View style={[styles.expand, treeConfig?.style]}>
          <ScrollView nestedScrollEnabled>
            {data?.children?.map((item, index) =>
              isFunction(treeConfig?.renderItem)
                ? treeConfig?.renderItem({
                    item,
                    index,
                    positionX,
                    columns,
                    depth,
                    defaultRender: renderItem,
                  })
                : renderItem({ item, index })
            )}
          </ScrollView>
        </View>
      );
    }
    return null;
  };

  return (
    <TouchableWithoutFeedback
      onPress={_onPressRow}
      disabled={!isFunction(onPressRow)}
    >
      <>
        {renderSeparator()}
        <View style={[styles.row, style]}>{renderColumns()}</View>
        {renderExpand()}
      </>
    </TouchableWithoutFeedback>
  );
};

export default memo(forwardRef(Row));
