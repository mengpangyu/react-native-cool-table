import { isNumber } from 'lodash';
import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import CoolTable, { ITableColumn } from 'react-native-cool-table';

const InteractiveDemo: React.FC = () => {
  // 任务数据
  const initialData = [
    {
      id: 1,
      title: '完成用户注册功能',
      assignee: '张三',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-10-20',
      progress: 0,
    },
    {
      id: 2,
      title: '优化数据库查询性能',
      assignee: '李四',
      priority: 'medium',
      status: 'inprogress',
      dueDate: '2024-10-25',
      progress: 60,
    },
    {
      id: 3,
      title: '设计新版本UI界面',
      assignee: '王五',
      priority: 'high',
      status: 'inprogress',
      dueDate: '2024-10-18',
      progress: 80,
    },
    {
      id: 4,
      title: '编写API文档',
      assignee: '赵六',
      priority: 'low',
      status: 'done',
      dueDate: '2024-10-15',
      progress: 100,
    },
    {
      id: 5,
      title: '修复登录页面bug',
      assignee: '孙七',
      priority: 'high',
      status: 'todo',
      dueDate: '2024-10-16',
      progress: 0,
    },
  ];

  const [data, setData] = useState(initialData);

  // 处理行点击
  const handleRowPress = useCallback(
    ({ item }: { item: any; rowIndex: number }) => {
      Alert.alert(
        '任务详情',
        `任务: ${item.title}\n负责人: ${item.assignee}\n进度: ${item.progress}%\n截止时间: ${item.dueDate}`,
        [
          { text: '取消', style: 'cancel' },
          {
            text: '编辑',
            onPress: () => Alert.alert('提示', '编辑功能开发中...'),
          },
        ]
      );
    },
    []
  );

  // 处理状态变更
  const handleStatusChange = useCallback(
    (taskId: number, newStatus: string) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === taskId
            ? {
                ...item,
                status: newStatus,
                progress:
                  newStatus === 'done'
                    ? 100
                    : newStatus === 'todo'
                    ? 0
                    : item.progress,
              }
            : item
        )
      );
      Alert.alert('成功', `任务状态已更新为: ${getStatusText(newStatus)}`);
    },
    []
  );

  // 处理优先级变更
  const handlePriorityChange = useCallback(
    (taskId: number, newPriority: string) => {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === taskId ? { ...item, priority: newPriority } : item
        )
      );
      Alert.alert('成功', `优先级已更新为: ${getPriorityText(newPriority)}`);
    },
    []
  );

  // 获取状态文本
  const getStatusText = (status: string) => {
    const statusMap = {
      todo: '待办',
      inprogress: '进行中',
      done: '已完成',
    };
    return statusMap[status as keyof typeof statusMap] || status;
  };

  // 获取优先级文本
  const getPriorityText = (priority: string) => {
    const priorityMap = {
      high: '高',
      medium: '中',
      low: '低',
    };
    return priorityMap[priority as keyof typeof priorityMap] || priority;
  };

  // 自定义优先级渲染
  const renderPriority = useCallback(
    (params: any) => {
      const { val, row } = params;
      const priorityConfig = {
        high: { color: '#ff4d4f', text: '高' },
        medium: { color: '#fa8c16', text: '中' },
        low: { color: '#52c41a', text: '低' },
      };
      const config = priorityConfig[val as keyof typeof priorityConfig];

      return (
        <TouchableOpacity
          style={styles.priorityContainer}
          onPress={() => {
            Alert.alert('修改优先级', `当前优先级: ${config?.text}`, [
              { text: '取消', style: 'cancel' },
              {
                text: '高',
                onPress: () => handlePriorityChange(row.id, 'high'),
              },
              {
                text: '中',
                onPress: () => handlePriorityChange(row.id, 'medium'),
              },
              {
                text: '低',
                onPress: () => handlePriorityChange(row.id, 'low'),
              },
            ]);
          }}
        >
          <View
            style={[styles.priorityDot, { backgroundColor: config?.color }]}
          />
          <Text style={[styles.priorityText, { color: config?.color }]}>
            {config?.text}
          </Text>
        </TouchableOpacity>
      );
    },
    [handlePriorityChange]
  );

  // 自定义状态渲染
  const renderStatus = useCallback(
    (params: any) => {
      const { val, row } = params;
      const statusConfig = {
        todo: { color: '#d9d9d9', bgColor: '#f5f5f5', text: '待办' },
        inprogress: { color: '#1890ff', bgColor: '#e6f7ff', text: '进行中' },
        done: { color: '#52c41a', bgColor: '#f6ffed', text: '已完成' },
      };
      const config = statusConfig[val as keyof typeof statusConfig];

      return (
        <TouchableOpacity
          style={[styles.statusBadge, { backgroundColor: config?.bgColor }]}
          onPress={() => {
            Alert.alert('修改状态', `当前状态: ${config?.text}`, [
              { text: '取消', style: 'cancel' },
              {
                text: '待办',
                onPress: () => handleStatusChange(row.id, 'todo'),
              },
              {
                text: '进行中',
                onPress: () => handleStatusChange(row.id, 'inprogress'),
              },
              {
                text: '已完成',
                onPress: () => handleStatusChange(row.id, 'done'),
              },
            ]);
          }}
        >
          <Text style={[styles.statusText, { color: config?.color }]}>
            {config?.text}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleStatusChange]
  );

  // 自定义进度渲染
  const renderProgress = useCallback((params: any) => {
    const { val } = params;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${isNumber(val) ? val : 0}%`,
                backgroundColor: val === 100 ? '#52c41a' : '#1890ff',
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>{val}%</Text>
      </View>
    );
  }, []);

  // 自定义操作渲染
  const renderActions = useCallback(
    (params: any) => {
      const { row } = params;
      return (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              Alert.alert('提示', `开始任务: ${row.title}`);
              handleStatusChange(row.id, 'inprogress');
            }}
          >
            <Text style={styles.actionButtonText}>开始</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.completeButton]}
            onPress={() => {
              Alert.alert('提示', `完成任务: ${row.title}`);
              handleStatusChange(row.id, 'done');
            }}
          >
            <Text style={styles.actionButtonText}>完成</Text>
          </TouchableOpacity>
        </View>
      );
    },
    [handleStatusChange]
  );

  // 列配置
  const columns: ITableColumn[] = [
    {
      key: 'title',
      title: '任务标题',
      width: 150,
      align: 'left',
      textStyle: { fontWeight: '500' },
      showArrow: true,
    },
    {
      key: 'assignee',
      title: '负责人',
      width: 80,
      align: 'center',
    },
    {
      key: 'priority',
      title: '优先级',
      width: 80,
      align: 'center',
      render: renderPriority,
    },
    {
      key: 'status',
      title: '状态',
      width: 90,
      align: 'center',
      render: renderStatus,
    },
    {
      key: 'progress',
      title: '进度',
      width: 100,
      align: 'center',
      render: renderProgress,
    },
    {
      key: 'dueDate',
      title: '截止时间',
      width: 100,
      align: 'center',
    },
    {
      key: 'actions',
      title: '操作',
      width: 120,
      align: 'center',
      render: renderActions,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>交互式表格</Text>
        <Text style={styles.description}>
          支持行点击、单元格交互、状态修改等多种交互操作
        </Text>
      </View>

      <View style={styles.tableContainer}>
        <CoolTable
          data={data}
          columns={columns}
          onPressRow={handleRowPress}
          style={styles.table}
          rowStyle={styles.row}
          headerRowStyle={styles.headerRow}
        />
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>交互功能：</Text>
        <Text style={styles.featureItem}>• 点击行查看任务详情</Text>
        <Text style={styles.featureItem}>• 点击优先级可修改</Text>
        <Text style={styles.featureItem}>• 点击状态可切换</Text>
        <Text style={styles.featureItem}>• 进度条可视化显示</Text>
        <Text style={styles.featureItem}>• 操作按钮快速处理</Text>
        <Text style={styles.featureItem}>• 实时数据更新</Text>
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
    minHeight: 56,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
  },
  // 优先级样式
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // 状态样式
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // 进度样式
  progressContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  // 操作按钮样式
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  completeButton: {
    backgroundColor: '#52c41a',
  },
  actionButtonText: {
    fontSize: 10,
    color: '#fff',
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

export default InteractiveDemo;
