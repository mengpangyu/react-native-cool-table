'use strict';

import React, {
  isValidElement,
  forwardRef,
  memo,
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Animated,
  UIManager,
  Platform,
  FlatList,
  LayoutChangeEvent,
} from 'react-native';

import styles from './styles';
import Empty from '../Empty';
import type { ITableProps, TItem, ITableColumn } from '../../types';
import { isFunction } from 'lodash';
import Row from '../Row';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Table = (
  {
    data = [],
    columns = [],
    style,
    onLayout,
    flatListProps,
    onPressRow,
    rowStyle,
    onSortChange,
    headerRowStyle,
    FooterComponent,
    emptyWrapperStyle,
    emptyProps,
    treeConfig,
    EmptyComponent,
    keyExtractor,
  }: ITableProps,
  _ref: any
) => {
  const [_columns, setColumns] = useState<ITableColumn[]>(columns);
  const rowRefs = useRef<any[]>([]);
  const [contentWidth, setContentWidth] = useState(0);
  const [positionX] = useState(new Animated.Value(0));

  useEffect(() => {
    if (rowRefs.current.length > data.length) {
      rowRefs.current = rowRefs.current.slice(0, data.length);
    }
  }, [data.length]);

  const headerData = useMemo(() => {
    const titleData: any = {};
    _columns.forEach((column) => {
      titleData[column.key] = column.title;
    });
    return titleData;
  }, [_columns]);

  const onScroll = useMemo(
    () =>
      Animated.event([{ nativeEvent: { contentOffset: { x: positionX } } }], {
        useNativeDriver: true,
      }),
    [positionX]
  );

  useEffect(() => {
    const fixedColumns = columns.filter((column) => column.fixed) ?? [];
    const normalColumns = columns.filter((column) => !column.fixed) ?? [];
    setColumns([...fixedColumns, ...normalColumns]);
  }, [columns]);

  const _onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width } = e.nativeEvent.layout;
      setContentWidth(width);
      onLayout?.(e);
    },
    [onLayout]
  );

  const onExpandChange = useCallback(
    (expanded: boolean, rowIndex: number) => {
      if (treeConfig?.autoCollapseOthers && expanded) {
        rowRefs.current?.forEach((rowRef, index) => {
          if (rowIndex !== index) {
            rowRef?.collapse();
          }
        });
      }
    },
    [treeConfig]
  );

  const getListKey = useCallback(
    (item: TItem, index: number) => {
      if (keyExtractor) {
        return keyExtractor(item, index);
      }
      return String(index);
    },
    [keyExtractor]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: TItem; index: number }) => (
      <Row
        key={`table-row-${index}`}
        style={rowStyle}
        onPressRow={onPressRow}
        data={item}
        rowIndex={index}
        columns={_columns}
        positionX={positionX}
        treeConfig={treeConfig}
        ref={(rowRef: any) => (rowRefs.current[index] = rowRef)}
        onExpandChange={onExpandChange}
      />
    ),
    [rowStyle, onPressRow, _columns, positionX, treeConfig, onExpandChange]
  );

  const renderHeader = useCallback(
    () => (
      <Row
        onSortChange={onSortChange}
        style={headerRowStyle}
        isHeader={true}
        data={headerData}
        columns={_columns}
        positionX={positionX}
        rowIndex={-1}
      />
    ),
    [onSortChange, headerRowStyle, headerData, _columns, positionX]
  );

  const renderFooter = useCallback(() => {
    if (FooterComponent) {
      return (
        <Animated.View
          style={[
            { width: contentWidth, transform: [{ translateX: positionX }] },
          ]}
        >
          {isValidElement(FooterComponent) ? (
            FooterComponent
          ) : isFunction(FooterComponent) ? (
            <FooterComponent />
          ) : null}
        </Animated.View>
      );
    }
    return null;
  }, [FooterComponent, contentWidth, positionX]);

  const renderEmpty = useCallback(
    () => (
      <>
        {renderHeader()}
        <Animated.View
          style={[
            styles.empty,
            { width: contentWidth, transform: [{ translateX: positionX }] },
            emptyWrapperStyle,
          ]}
        >
          {isValidElement(EmptyComponent) ? (
            EmptyComponent
          ) : isFunction(EmptyComponent) ? (
            <EmptyComponent />
          ) : (
            <Empty {...emptyProps} />
          )}
        </Animated.View>
      </>
    ),
    [
      renderHeader,
      contentWidth,
      positionX,
      emptyWrapperStyle,
      EmptyComponent,
      emptyProps,
    ]
  );

  return (
    <View style={[styles.content, style]} onLayout={_onLayout}>
      <Animated.ScrollView
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        onScroll={onScroll}
      >
        <View>
          {data?.length ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={getListKey}
              stickyHeaderIndices={[0]}
              initialNumToRender={25}
              ListHeaderComponent={renderHeader}
              ListFooterComponent={renderFooter}
              {...flatListProps}
              data={data}
              renderItem={renderItem}
            />
          ) : (
            renderEmpty()
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default memo(forwardRef(Table));
