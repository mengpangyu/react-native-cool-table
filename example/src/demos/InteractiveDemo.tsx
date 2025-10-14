import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import type { ITableColumn } from 'react-native-cool-table';
import DemoLayout from '../components/DemoLayout';
import TableContainer from '../components/TableContainer';
import { generateTasks } from '../utils/dataUtils';
import {
  renderProgress,
  renderPriority,
  renderActionButtons,
} from '../utils/renderUtils';
import { colors } from '../styles/commonStyles';

const InteractiveDemo: React.FC = () => {
  // 使用工具函数生成任务数据
  const [data, setData] = useState(() => generateTasks(5));

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

  // 自定义优先级渲染（带点击事件）
  const renderInteractivePriority = useCallback(
    (params: any) => {
      const { val, row } = params;
      const onPress = () => {
        const config = {
          high: '高',
          medium: '中',
          low: '低',
        };
        const currentText = config[val as keyof typeof config];

        Alert.alert('修改优先级', `当前优先级: ${currentText}`, [
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
      };

      return renderPriority(params, onPress);
    },
    [handlePriorityChange]
  );

  // 自定义状态渲染（带点击事件）
  const renderInteractiveStatus = useCallback(
    (params: any) => {
      const { val, row } = params;
      const statusConfig = {
        todo: { color: '#d9d9d9', bgColor: '#f5f5f5', text: '待办' },
        inprogress: {
          color: colors.primary,
          bgColor: '#e6f7ff',
          text: '进行中',
        },
        done: { color: colors.success, bgColor: '#f6ffed', text: '已完成' },
      };
      const config = statusConfig[val as keyof typeof statusConfig];

      return (
        <TouchableOpacity
          style={[styles.statusBadge, { backgroundColor: config.bgColor }]}
          onPress={() => {
            Alert.alert('修改状态', `当前状态: ${config.text}`, [
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
          <Text style={[styles.statusText, { color: config.color }]}>
            {config.text}
          </Text>
        </TouchableOpacity>
      );
    },
    [handleStatusChange]
  );

  // 自定义操作渲染
  const renderActions = useCallback(
    (params: any) => {
      const actions = [
        {
          text: '开始',
          onPress: (row: any) => {
            Alert.alert('提示', `开始任务: ${row.title}`);
            handleStatusChange(row.id, 'inprogress');
          },
        },
        {
          text: '完成',
          onPress: (row: any) => {
            Alert.alert('提示', `完成任务: ${row.title}`);
            handleStatusChange(row.id, 'done');
          },
          style: { backgroundColor: colors.success },
        },
      ];
      return renderActionButtons(params, actions);
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
      render: renderInteractivePriority,
    },
    {
      key: 'status',
      title: '状态',
      width: 90,
      align: 'center',
      render: renderInteractiveStatus,
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

  const features = [
    '点击行查看任务详情',
    '点击优先级可修改',
    '点击状态可切换',
    '进度条可视化显示',
    '操作按钮快速处理',
    '实时数据更新',
  ];

  return (
    <DemoLayout
      title="交互式表格"
      description="支持行点击、单元格交互、状态修改等多种交互操作"
      features={features}
    >
      <TableContainer
        data={data}
        columns={columns}
        onPressRow={handleRowPress}
        flex
      />
    </DemoLayout>
  );
};

const styles = StyleSheet.create({
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
});

export default InteractiveDemo;
