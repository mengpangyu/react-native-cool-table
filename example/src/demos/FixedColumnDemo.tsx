import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CoolTable, { ITableColumn } from 'react-native-cool-table';

const FixedColumnDemo: React.FC = () => {
  // 销售数据（包含多个月份的数据）
  const data = [
    {
      id: 1,
      name: '张三',
      department: '华北区',
      jan: 12000,
      feb: 15000,
      mar: 18000,
      apr: 16000,
      may: 20000,
      jun: 22000,
      jul: 19000,
      aug: 21000,
      sep: 23000,
      oct: 25000,
      nov: 24000,
      dec: 26000,
    },
    {
      id: 2,
      name: '李四',
      department: '华东区',
      jan: 15000,
      feb: 18000,
      mar: 16000,
      apr: 19000,
      may: 22000,
      jun: 24000,
      jul: 21000,
      aug: 23000,
      sep: 25000,
      oct: 27000,
      nov: 26000,
      dec: 28000,
    },
    {
      id: 3,
      name: '王五',
      department: '华南区',
      jan: 10000,
      feb: 12000,
      mar: 14000,
      apr: 13000,
      may: 16000,
      jun: 18000,
      jul: 17000,
      aug: 19000,
      sep: 20000,
      oct: 22000,
      nov: 21000,
      dec: 23000,
    },
    {
      id: 4,
      name: '赵六',
      department: '西南区',
      jan: 8000,
      feb: 9000,
      mar: 11000,
      apr: 10000,
      may: 13000,
      jun: 15000,
      jul: 14000,
      aug: 16000,
      sep: 17000,
      oct: 19000,
      nov: 18000,
      dec: 20000,
    },
    {
      id: 5,
      name: '孙七',
      department: '西北区',
      jan: 11000,
      feb: 13000,
      mar: 15000,
      apr: 14000,
      may: 17000,
      jun: 19000,
      jul: 18000,
      aug: 20000,
      sep: 21000,
      oct: 23000,
      nov: 22000,
      dec: 24000,
    },
  ];

  // 自定义销售额渲染
  const renderSales = (params: any) => {
    const { val } = params;
    let color = '#52c41a'; // 绿色 - 高销售额
    if (val < 15000) color = '#fa8c16'; // 橙色 - 中等
    if (val < 10000) color = '#ff4d4f'; // 红色 - 低销售额

    return (
      <View style={styles.salesContainer}>
        <Text style={[styles.salesText, { color }]}>
          ¥{(val / 1000).toFixed(0)}K
        </Text>
      </View>
    );
  };

  // 列配置 - 前两列固定
  const columns: ITableColumn[] = [
    {
      key: 'name',
      title: '姓名',
      width: 80,
      fixed: true,
      align: 'left',
      textStyle: { fontWeight: 'bold' },
    },
    {
      key: 'department',
      title: '区域',
      width: 80,
      fixed: true,
      align: 'center',
      textStyle: { fontWeight: '500' },
    },
    {
      key: 'jan',
      title: '1月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'feb',
      title: '2月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'mar',
      title: '3月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'apr',
      title: '4月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'may',
      title: '5月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'jun',
      title: '6月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'jul',
      title: '7月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'aug',
      title: '8月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'sep',
      title: '9月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'oct',
      title: '10月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'nov',
      title: '11月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
    {
      key: 'dec',
      title: '12月',
      width: 70,
      align: 'right',
      render: renderSales,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>固定列表格</Text>
        <Text style={styles.description}>
          姓名和区域列固定在左侧，左右滑动查看各月销售数据时固定列不会移动
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

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>销售额颜色说明：</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#52c41a' }]} />
            <Text style={styles.legendText}>≥15K 优秀</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#fa8c16' }]} />
            <Text style={styles.legendText}>10K-15K 良好</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: '#ff4d4f' }]} />
            <Text style={styles.legendText}>&lt;10K 待提升</Text>
          </View>
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>功能特点：</Text>
        <Text style={styles.featureItem}>• 左侧列固定不滚动</Text>
        <Text style={styles.featureItem}>• 水平滚动查看更多数据</Text>
        <Text style={styles.featureItem}>• 多列固定支持</Text>
        <Text style={styles.featureItem}>• 固定列与滚动列样式统一</Text>
        <Text style={styles.featureItem}>• 销售额颜色编码显示</Text>
        <Text style={styles.featureItem}>• 适合展示宽表格数据</Text>
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
  salesContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  salesText: {
    fontSize: 13,
    fontWeight: '600',
  },
  legend: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  colorBox: {
    width: 12,
    height: 12,
    borderRadius: 2,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
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

export default FixedColumnDemo;
