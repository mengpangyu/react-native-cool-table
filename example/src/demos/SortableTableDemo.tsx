import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CoolTable, { ITableColumn, TSortType } from 'react-native-cool-table';

const SortableTableDemo: React.FC = () => {
  // 学生成绩数据
  const initialData = [
    { id: 1, name: '张三', math: 85, english: 92, physics: 78, total: 255 },
    { id: 2, name: '李四', math: 92, english: 88, physics: 85, total: 265 },
    { id: 3, name: '王五', math: 78, english: 95, physics: 82, total: 255 },
    { id: 4, name: '赵六', math: 88, english: 85, physics: 90, total: 263 },
    { id: 5, name: '孙七', math: 95, english: 78, physics: 88, total: 261 },
    { id: 6, name: '周八', math: 82, english: 90, physics: 85, total: 257 },
    { id: 7, name: '吴九', math: 90, english: 82, physics: 92, total: 264 },
    { id: 8, name: '郑十', math: 87, english: 89, physics: 86, total: 262 },
  ];

  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    sort: TSortType;
  } | null>(null);

  // 处理排序
  const handleSortChange = useCallback(
    ({ key, sort }: { key: string; colIndex: number; sort: TSortType }) => {
      setSortConfig({ key, sort });

      const sortedData = [...data].sort((a, b) => {
        const aVal = a[key as keyof typeof a];
        const bVal = b[key as keyof typeof b];

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sort === 'asc' ? aVal - bVal : bVal - aVal;
        }

        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();

        if (sort === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });

      setData(sortedData);
    },
    [data]
  );

  // 自定义分数渲染
  const renderScore = useCallback((params: any) => {
    const { val } = params;
    let color = '#52c41a'; // 绿色 - 优秀
    if (val < 60) color = '#ff4d4f'; // 红色 - 不及格
    else if (val < 80) color = '#fa8c16'; // 橙色 - 良好

    return (
      <View style={styles.scoreContainer}>
        <Text style={[styles.scoreText, { color }]}>{val}</Text>
      </View>
    );
  }, []);

  // 自定义总分渲染
  const renderTotal = useCallback((params: any) => {
    const { val } = params;
    const isTop = val >= 260;
    return (
      <View style={[styles.totalContainer, isTop && styles.topScore]}>
        <Text style={[styles.totalText, isTop && styles.topScoreText]}>
          {val}
        </Text>
        {isTop && <Text style={styles.topLabel}>优秀</Text>}
      </View>
    );
  }, []);

  // 列配置
  const columns: ITableColumn[] = [
    {
      key: 'name',
      title: '姓名',
      width: 80,
      align: 'left',
      sortable: true,
      textStyle: { fontWeight: 'bold' },
    },
    {
      key: 'math',
      title: '数学',
      width: 70,
      align: 'center',
      sortable: true,
      defaultSort: 'desc' as TSortType,
      render: renderScore,
    },
    {
      key: 'english',
      title: '英语',
      width: 70,
      align: 'center',
      sortable: true,
      render: renderScore,
    },
    {
      key: 'physics',
      title: '物理',
      width: 70,
      align: 'center',
      sortable: true,
      render: renderScore,
    },
    {
      key: 'total',
      title: '总分',
      width: 80,
      align: 'center',
      sortable: true,
      render: renderTotal,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>排序表格</Text>
        <Text style={styles.description}>
          点击表头可以对数据进行排序，支持升序和降序切换
        </Text>
        {sortConfig && (
          <Text style={styles.sortInfo}>
            当前排序: {columns.find((col) => col.key === sortConfig.key)?.title}{' '}
            - {sortConfig.sort === 'asc' ? '升序' : '降序'}
          </Text>
        )}
      </View>

      <View style={styles.tableContainer}>
        <CoolTable
          data={data}
          columns={columns}
          onSortChange={handleSortChange}
          style={styles.table}
          rowStyle={styles.row}
          headerRowStyle={styles.headerRow}
        />
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>功能特点：</Text>
        <Text style={styles.featureItem}>• 点击表头进行排序</Text>
        <Text style={styles.featureItem}>• 支持升序/降序切换</Text>
        <Text style={styles.featureItem}>• 默认排序设置（数学列默认降序）</Text>
        <Text style={styles.featureItem}>• 自定义分数颜色显示</Text>
        <Text style={styles.featureItem}>• 总分优秀标识</Text>
        <Text style={styles.featureItem}>• 实时显示排序状态</Text>
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
    marginBottom: 8,
  },
  sortInfo: {
    fontSize: 12,
    color: '#1890ff',
    fontStyle: 'italic',
  },
  tableContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flex: 1,
  },
  table: {
    backgroundColor: '#fff',
  },
  row: {
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
  totalContainer: {
    alignItems: 'center',
    paddingVertical: 4,
  },
  topScore: {
    backgroundColor: '#f6ffed',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  topScoreText: {
    color: '#52c41a',
  },
  topLabel: {
    fontSize: 10,
    color: '#52c41a',
    fontWeight: '500',
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
});

export default SortableTableDemo;
