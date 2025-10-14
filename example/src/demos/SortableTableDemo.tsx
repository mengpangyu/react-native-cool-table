import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import type { ITableColumn, TSortType } from 'react-native-cool-table';
import DemoLayout from '../components/DemoLayout';
import TableContainer from '../components/TableContainer';
import { generateStudentScores, sortData } from '../utils/dataUtils';
import { renderScore } from '../utils/renderUtils';
import { commonStyles } from '../styles/commonStyles';

const SortableTableDemo: React.FC = () => {
  // 使用工具函数生成学生成绩数据
  const initialData = generateStudentScores(8);
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    sort: TSortType;
  } | null>(null);

  // 处理排序
  const handleSortChange = useCallback(
    ({ key, sort }: { key: string; colIndex: number; sort: TSortType }) => {
      setSortConfig({ key, sort });
      const sortedData = sortData(data, key, sort);
      setData(sortedData);
    },
    [data]
  );

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

  const features = [
    '点击表头进行排序',
    '支持升序/降序切换',
    '默认排序设置（数学列默认降序）',
    '自定义分数颜色显示',
    '总分优秀标识',
    '实时显示排序状态',
  ];

  // 排序信息组件
  const sortInfo = sortConfig && (
    <Text style={commonStyles.sortInfo}>
      当前排序: {columns.find((col) => col.key === sortConfig.key)?.title} -
      {sortConfig.sort === 'asc' ? '升序' : '降序'}
    </Text>
  );

  return (
    <DemoLayout
      title="排序表格"
      description="点击表头可以对数据进行排序，支持升序和降序切换"
      extraInfo={sortInfo}
      features={features}
    >
      <TableContainer
        data={data}
        columns={columns}
        onSortChange={handleSortChange}
        flex
      />
    </DemoLayout>
  );
};

// 局部样式（只保留特殊的样式）
const styles = {
  totalContainer: {
    alignItems: 'center' as const,
    paddingVertical: 4,
  },
  topScore: {
    backgroundColor: '#f6ffed',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  totalText: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: '#333',
  },
  topScoreText: {
    color: '#52c41a',
  },
  topLabel: {
    fontSize: 10,
    color: '#52c41a',
    fontWeight: '500' as const,
  },
};

export default SortableTableDemo;
