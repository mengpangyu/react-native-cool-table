import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CoolTable, { ITableColumn } from 'react-native-cool-table';

const BasicTableDemo: React.FC = () => {
  // 基础数据
  const data = [
    { id: 1, name: '张三', age: 25, city: '北京', score: 85 },
    { id: 2, name: '李四', age: 30, city: '上海', score: 92 },
    { id: 3, name: '王五', age: 28, city: '广州', score: 78 },
    { id: 4, name: '赵六', age: 32, city: '深圳', score: 88 },
    { id: 5, name: '孙七', age: 27, city: '杭州', score: 95 },
  ];

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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>基础表格</Text>
        <Text style={styles.description}>
          展示最基本的表格功能，包含简单的数据展示和列对齐
        </Text>
      </View>

      <View style={styles.tableContainer}>
        <CoolTable
          data={data}
          columns={columns}
          style={styles.table}
          rowStyle={styles.row}
          headerRowStyle={styles.headerRow}
        />
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>功能特点：</Text>
        <Text style={styles.featureItem}>• 简洁的数据展示</Text>
        <Text style={styles.featureItem}>
          • 列对齐设置（左对齐、居中、右对齐）
        </Text>
        <Text style={styles.featureItem}>• 自定义列宽</Text>
        <Text style={styles.featureItem}>• 基础样式配置</Text>
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
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
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

export default BasicTableDemo;
