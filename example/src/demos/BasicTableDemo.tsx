import React from 'react';
import type { ITableColumn } from 'react-native-cool-table';
import DemoLayout from '../components/DemoLayout';
import TableContainer from '../components/TableContainer';
import { generateBasicUsers } from '../utils/dataUtils';

const BasicTableDemo: React.FC = () => {
  // 使用工具函数生成数据
  const data = generateBasicUsers(5);

  // 基础列配置
  const columns: ITableColumn[] = [
    {
      key: 'name',
      title: '姓名',
      width: 80,
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
      key: 'score',
      title: '分数',
      width: 60,
      align: 'right',
    },
  ];

  const features = [
    '简洁的数据展示',
    '列对齐设置（左对齐、居中、右对齐）',
    '自定义列宽',
    '基础样式配置',
  ];

  return (
    <DemoLayout
      title="基础表格"
      description="展示最基本的表格功能，包含简单的数据展示和列对齐"
      features={features}
    >
      <TableContainer data={data} columns={columns} flex />
    </DemoLayout>
  );
};

export default BasicTableDemo;
