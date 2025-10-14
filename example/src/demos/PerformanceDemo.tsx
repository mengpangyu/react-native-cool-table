import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import CoolTable, { ITableColumn } from 'react-native-cool-table';

const PerformanceDemo: React.FC = () => {
  const [dataSize, setDataSize] = useState(100);
  const [renderTime, setRenderTime] = useState<number | null>(null);

  // 生成大量测试数据
  const generateLargeData = useCallback((size: number) => {
    const startTime = Date.now();

    const data = Array.from({ length: size }, (_, index) => ({
      id: index + 1,
      name: `用户${index + 1}`,
      email: `user${index + 1}@example.com`,
      age: Math.floor(Math.random() * 50) + 20,
      city: ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'][
        Math.floor(Math.random() * 8)
      ],
      salary: Math.floor(Math.random() * 50000) + 10000,
      department: ['技术部', '产品部', '设计部', '运营部', '市场部'][
        Math.floor(Math.random() * 5)
      ],
      joinDate: `202${Math.floor(Math.random() * 4)}-${String(
        Math.floor(Math.random() * 12) + 1
      ).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(
        2,
        '0'
      )}`,
      status: ['在职', '试用期', '离职'][Math.floor(Math.random() * 3)],
      score: Math.floor(Math.random() * 100),
    }));

    const endTime = Date.now();
    setRenderTime(endTime - startTime);

    return data;
  }, []);

  // 使用 useMemo 优化数据生成
  const data = useMemo(
    () => generateLargeData(dataSize),
    [dataSize, generateLargeData]
  );

  // 自定义薪资渲染（优化版本）
  const renderSalary = useCallback((params: any) => {
    const { val } = params;
    return (
      <View style={styles.salaryContainer}>
        <Text style={styles.salaryText}>¥{(val / 1000).toFixed(0)}K</Text>
      </View>
    );
  }, []);

  // 自定义状态渲染（优化版本）
  const renderStatus = useCallback((params: any) => {
    const { val } = params;
    const statusColor =
      val === '在职' ? '#52c41a' : val === '试用期' ? '#fa8c16' : '#ff4d4f';

    return (
      <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
        <Text style={styles.statusText}>{val}</Text>
      </View>
    );
  }, []);

  // 自定义分数渲染（优化版本）
  const renderScore = useCallback((params: any) => {
    const { val } = params;
    const color = val >= 80 ? '#52c41a' : val >= 60 ? '#fa8c16' : '#ff4d4f';

    return (
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, { color }]}>{val}</Text>
      </View>
    );
  }, []);

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
        render: renderSalary,
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
        render: renderStatus,
      },
      {
        key: 'score',
        title: '评分',
        width: 60,
        align: 'center',
        render: renderScore,
      },
    ],
    [renderSalary, renderStatus, renderScore]
  );

  // 数据量选项
  const dataSizeOptions = [100, 500, 1000, 2000, 5000];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>性能测试表格</Text>
        <Text style={styles.description}>
          测试大数据量下的表格渲染性能，包含固定列和自定义渲染
        </Text>

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

      <View style={styles.tableContainer}>
        <CoolTable
          data={data}
          columns={columns}
          style={styles.table}
          rowStyle={styles.row}
          headerRowStyle={styles.headerRow}
          onPressRow={({ item }) => {
            Alert.alert('用户信息', `姓名: ${item.name}\n邮箱: ${item.email}`);
          }}
        />
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>性能优化特性：</Text>
        <Text style={styles.featureItem}>• 虚拟化滚动（仅渲染可见行）</Text>
        <Text style={styles.featureItem}>• useMemo 优化列配置</Text>
        <Text style={styles.featureItem}>• useCallback 优化渲染函数</Text>
        <Text style={styles.featureItem}>• 固定列性能优化</Text>
        <Text style={styles.featureItem}>• 大数据量流畅滚动</Text>
        <Text style={styles.featureItem}>• 内存使用优化</Text>

        <View style={styles.performanceTips}>
          <Text style={styles.tipsTitle}>性能优化建议：</Text>
          <Text style={styles.tipItem}>
            1. 使用 keyExtractor 提供稳定的 key
          </Text>
          <Text style={styles.tipItem}>2. 避免在 render 函数中创建新对象</Text>
          <Text style={styles.tipItem}>3. 使用 memo 包装自定义渲染组件</Text>
          <Text style={styles.tipItem}>4. 合理设置 initialNumToRender</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 16,
  },
  controls: {
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  sizeButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    backgroundColor: '#1890ff',
  },
  sizeButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  activeSizeButtonText: {
    color: '#fff',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 12,
    color: '#1890ff',
    fontWeight: '500',
  },
  tableContainer: {
    flex: 1,
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  table: {
    backgroundColor: '#fff',
  },
  row: {
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
  },
  salaryContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  salaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52c41a',
  },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    alignSelf: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '500',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 12,
    fontWeight: '600',
  },
  features: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  performanceTips: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  tipItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
    lineHeight: 16,
  },
});

export default PerformanceDemo;
