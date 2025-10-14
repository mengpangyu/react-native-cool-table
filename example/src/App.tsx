import * as React from 'react';
import { useState, useCallback } from 'react';

import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import CoolTable, { ITableColumn, TSortType } from 'react-native-cool-table';

// 模拟数据
const generateMockData = () => [
  {
    id: '1',
    name: '张三',
    age: 28,
    department: '技术部',
    salary: 15000,
    email: 'zhangsan@example.com',
    phone: '138****1234',
    status: '在职',
    joinDate: '2022-01-15',
    children: [
      {
        id: '1-1',
        name: '项目A',
        progress: '80%',
        deadline: '2024-12-31',
        priority: '高',
      },
      {
        id: '1-2',
        name: '项目B',
        progress: '60%',
        deadline: '2024-11-30',
        priority: '中',
      },
    ],
  },
  {
    id: '2',
    name: '李四',
    age: 32,
    department: '产品部',
    salary: 18000,
    email: 'lisi@example.com',
    phone: '139****5678',
    status: '在职',
    joinDate: '2021-06-20',
    children: [
      {
        id: '2-1',
        name: '需求分析',
        progress: '100%',
        deadline: '2024-10-15',
        priority: '高',
      },
    ],
  },
  {
    id: '3',
    name: '王五',
    age: 25,
    department: '设计部',
    salary: 12000,
    email: 'wangwu@example.com',
    phone: '137****9012',
    status: '试用期',
    joinDate: '2024-03-01',
    children: [],
  },
  {
    id: '4',
    name: '赵六',
    age: 35,
    department: '技术部',
    salary: 22000,
    email: 'zhaoliu@example.com',
    phone: '136****3456',
    status: '在职',
    joinDate: '2020-09-10',
    children: [
      {
        id: '4-1',
        name: '架构设计',
        progress: '90%',
        deadline: '2024-12-01',
        priority: '高',
      },
      {
        id: '4-2',
        name: '代码审查',
        progress: '70%',
        deadline: '2024-11-15',
        priority: '中',
      },
      {
        id: '4-3',
        name: '性能优化',
        progress: '40%',
        deadline: '2025-01-31',
        priority: '低',
      },
    ],
  },
  {
    id: '5',
    name: '孙七',
    age: 29,
    department: '运营部',
    salary: 14000,
    email: 'sunqi@example.com',
    phone: '135****7890',
    status: '在职',
    joinDate: '2022-11-08',
    children: [],
  },
];

export default function App() {
  const [data, setData] = useState(generateMockData());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    sort: TSortType;
  } | null>(null);

  // 处理排序
  const handleSortChange = useCallback(
    ({ key, sort }: { key: string; colIndex: number; sort: TSortType }) => {
      setSortConfig({ key, sort });

      const sortedData = [...data].sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

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

  // 处理行点击
  const handleRowPress = useCallback(
    ({ item, rowIndex }: { item: any; rowIndex: number }) => {
      Alert.alert(
        '行点击事件',
        `点击了第 ${rowIndex + 1} 行\n姓名: ${item.name}\n部门: ${
          item.department
        }`,
        [{ text: '确定' }]
      );
    },
    []
  );

  // 处理单元格点击
  const handleCellPress = useCallback((params: any) => {
    Alert.alert('单元格点击', `点击了 ${params.col.title}: ${params.val}`, [
      { text: '确定' },
    ]);
  }, []);

  // 自定义渲染函数
  const renderSalary = useCallback((params: any) => {
    const { val } = params;
    return (
      <View style={styles.salaryContainer}>
        <Text
          style={[
            styles.salaryText,
            {
              color:
                val >= 20000 ? '#ff4d4f' : val >= 15000 ? '#fa8c16' : '#52c41a',
            },
          ]}
        >
          ¥{val?.toLocaleString()}
        </Text>
      </View>
    );
  }, []);

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

  // 自定义展开内容渲染
  const renderExpandContent = useCallback(
    ({ data: expandData, parentData }: any) => {
      if (!expandData || expandData.length === 0) {
        return (
          <View style={styles.emptyExpand}>
            <Text style={styles.emptyExpandText}>暂无项目信息</Text>
          </View>
        );
      }

      return (
        <View style={styles.expandContainer}>
          <Text style={styles.expandTitle}>
            项目列表 ({expandData.length}个项目)
          </Text>
          {expandData.map((project: any, index: number) => (
            <View key={project.id} style={styles.projectItem}>
              <View style={styles.projectHeader}>
                <Text style={styles.projectName}>{project.name}</Text>
                <Text
                  style={[
                    styles.projectPriority,
                    {
                      color:
                        project.priority === '高'
                          ? '#ff4d4f'
                          : project.priority === '中'
                          ? '#fa8c16'
                          : '#52c41a',
                    },
                  ]}
                >
                  {project.priority}优先级
                </Text>
              </View>
              <View style={styles.projectDetails}>
                <Text style={styles.projectDetail}>
                  进度: {project.progress}
                </Text>
                <Text style={styles.projectDetail}>
                  截止: {project.deadline}
                </Text>
              </View>
            </View>
          ))}
        </View>
      );
    },
    []
  );

  // 表格列配置
  const columns: ITableColumn[] = [
    {
      key: 'name',
      title: '姓名',
      width: 80,
      fixed: true, // 固定列
      align: 'left',
      sortable: true,
      textStyle: { fontWeight: 'bold' },
    },
    {
      key: 'age',
      title: '年龄',
      width: 60,
      align: 'center',
      sortable: true,
      defaultSort: 'desc' as TSortType,
    },
    {
      key: 'department',
      title: '部门',
      width: 80,
      align: 'center',
      sortable: true,
      onPress: handleCellPress,
      showArrow: true,
    },
    {
      key: 'salary',
      title: '薪资',
      width: 100,
      align: 'right',
      sortable: true,
      render: renderSalary,
    },
    {
      key: 'status',
      title: '状态',
      width: 80,
      align: 'center',
      render: renderStatus,
    },
    {
      key: 'email',
      title: '邮箱',
      width: 150,
      align: 'left',
      onPress: handleCellPress,
      showArrow: true,
    },
    {
      key: 'phone',
      title: '手机号',
      width: 100,
      align: 'center',
    },
    {
      key: 'joinDate',
      title: '入职日期',
      width: 100,
      align: 'center',
      sortable: true,
    },
  ];

  // 树形配置
  const treeConfig = {
    autoCollapseOthers: true, // 自动折叠其他展开项
    animationDuration: 300, // 动画持续时间
    renderExpand: renderExpandContent,
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <ScrollView style={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>员工信息表格 Demo</Text>
          <Text style={styles.subtitle}>
            展示排序、固定列、展开行、自定义渲染等功能
          </Text>
          {sortConfig && (
            <Text style={styles.sortInfo}>
              当前排序:{' '}
              {columns.find((col) => col.key === sortConfig.key)?.title} -
              {sortConfig.sort === 'asc' ? '升序' : '降序'}
            </Text>
          )}
        </View>

        <View style={styles.tableContainer}>
          <CoolTable
            data={data}
            columns={columns}
            onSortChange={handleSortChange}
            onPressRow={handleRowPress}
            treeConfig={treeConfig}
            style={styles.table}
            rowStyle={styles.tableRow}
            headerRowStyle={styles.headerRow}
            EmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>暂无数据</Text>
              </View>
            }
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            • 点击姓名列可以排序{'\n'}• 点击部门和邮箱单元格有交互{'\n'}•
            点击行可以查看详情{'\n'}• 点击有子项目的员工可以展开查看项目信息
            {'\n'}• 姓名列为固定列，左右滑动时不会移动
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e8e8e8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
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
  },
  table: {
    backgroundColor: '#fff',
  },
  tableRow: {
    minHeight: 50,
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
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  expandContainer: {
    padding: 12,
    backgroundColor: '#f9f9f9',
  },
  expandTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  projectItem: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#1890ff',
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  projectName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  projectPriority: {
    fontSize: 12,
    fontWeight: '500',
  },
  projectDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectDetail: {
    fontSize: 12,
    color: '#666',
  },
  emptyExpand: {
    padding: 20,
    alignItems: 'center',
  },
  emptyExpandText: {
    color: '#999',
    fontSize: 14,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 8,
  },
  footerText: {
    fontSize: 13,
    color: '#666',
    lineHeight: 20,
  },
});
