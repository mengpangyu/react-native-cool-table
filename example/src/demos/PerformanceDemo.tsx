import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import type { ITableColumn } from 'react-native-cool-table';
import DemoLayout from '../components/DemoLayout';
import TableContainer from '../components/TableContainer';
import { generateEmployees } from '../utils/dataUtils';
import { renderSalaryK, renderStatusBadge } from '../utils/renderUtils';
import { colors, commonStyles } from '../styles/commonStyles';

const PerformanceDemo: React.FC = () => {
  const [dataSize, setDataSize] = useState(100);
  const [renderTime, setRenderTime] = useState<number | null>(null);

  // 使用 useMemo 优化数据生成
  const data = useMemo(() => {
    const startTime = Date.now();
    const generatedData = generateEmployees(dataSize);
    const endTime = Date.now();
    setRenderTime(endTime - startTime);
    return generatedData;
  }, [dataSize]);

  // 处理数据量变更
  const handleDataSizeChange = useCallback((size: number) => {
    const startTime = Date.now();
    setDataSize(size);
    // 使用 setTimeout 来测量渲染时间
    setTimeout(() => {
      const endTime = Date.now();
      setRenderTime(endTime - startTime);
    }, 100);
  }, []);

  // 处理行点击
  const handleRowPress = useCallback(({ item }: { item: any }) => {
    Alert.alert('用户信息', `姓名: ${item.name}\n邮箱: ${item.email}`);
  }, []);

  // 列配置（优化版本）
  const columns: ITableColumn[] = useMemo(
    () => [
      {
        key: 'id',
        title: 'ID',
        width: 60,
        align: 'center',
      },
      {
        key: 'name',
        title: '姓名',
        width: 80,
        align: 'left',
        fixed: true,
      },
      {
        key: 'email',
        title: '邮箱',
        width: 150,
        align: 'left',
      },
      {
        key: 'age',
        title: '年龄',
        width: 60,
        align: 'center',
      },
      {
        key: 'city',
        title: '城市',
        width: 80,
        align: 'center',
      },
      {
        key: 'salary',
        title: '薪资',
        width: 80,
        align: 'right',
        render: renderSalaryK,
      },
      {
        key: 'department',
        title: '部门',
        width: 80,
        align: 'center',
      },
      {
        key: 'joinDate',
        title: '入职日期',
        width: 100,
        align: 'center',
      },
      {
        key: 'status',
        title: '状态',
        width: 80,
        align: 'center',
        render: renderStatusBadge,
      },
    ],
    []
  );

  // 数据量选项
  const dataSizeOptions = [100, 500, 1000, 2000, 5000];

  const features = [
    '虚拟化滚动（仅渲染可见行）',
    'useMemo 优化列配置',
    'useCallback 优化渲染函数',
    '固定列性能优化',
    '大数据量流畅滚动',
    '内存使用优化',
  ];

  // 控制面板组件
  const controlPanel = (
    <View style={styles.controls}>
      <Text style={styles.controlLabel}>数据量:</Text>
      <View style={styles.sizeButtons}>
        {dataSizeOptions.map((size) => (
          <TouchableOpacity
            key={size}
            style={[
              styles.sizeButton,
              dataSize === size && styles.activeSizeButton,
            ]}
            onPress={() => handleDataSizeChange(size)}
          >
            <Text
              style={[
                styles.sizeButtonText,
                dataSize === size && styles.activeSizeButtonText,
              ]}
            >
              {size}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.stats}>
        <Text style={styles.statsText}>
          当前数据量: {dataSize.toLocaleString()} 条
        </Text>
        {renderTime !== null && (
          <Text style={styles.statsText}>渲染耗时: {renderTime}ms</Text>
        )}
      </View>
    </View>
  );

  // 性能优化建议组件
  const performanceTips = (
    <View style={styles.performanceTips}>
      <Text style={styles.tipsTitle}>性能优化建议：</Text>
      <Text style={styles.tipItem}>1. 使用 keyExtractor 提供稳定的 key</Text>
      <Text style={styles.tipItem}>2. 避免在 render 函数中创建新对象</Text>
      <Text style={styles.tipItem}>3. 使用 memo 包装自定义渲染组件</Text>
      <Text style={styles.tipItem}>4. 合理设置 initialNumToRender</Text>
    </View>
  );

  return (
    <DemoLayout
      title="性能测试表格"
      description="测试大数据量下的表格渲染性能，包含固定列和自定义渲染"
      extraInfo={controlPanel}
      features={features}
      scrollable
    >
      <TableContainer
        data={data}
        columns={columns}
        onPressRow={handleRowPress}
        style={commonStyles.rowSmall}
      />
      {performanceTips}
    </DemoLayout>
  );
};

const styles = StyleSheet.create({
  controls: {
    marginTop: 16,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  sizeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  sizeButton: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  activeSizeButton: {
    backgroundColor: colors.primary,
  },
  sizeButtonText: {
    fontSize: 12,
    color: colors.text,
    fontWeight: '500',
  },
  activeSizeButtonText: {
    color: colors.white,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  performanceTips: {
    margin: 16,
    marginTop: 0,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 6,
  },
  tipItem: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 3,
    lineHeight: 16,
  },
});

export default PerformanceDemo;
