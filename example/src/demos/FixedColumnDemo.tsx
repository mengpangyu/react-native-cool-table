import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ITableColumn } from 'react-native-cool-table';
import DemoLayout from '../components/DemoLayout';
import TableContainer from '../components/TableContainer';
import { generateSalesData } from '../utils/dataUtils';
import { colors } from '../styles/commonStyles';

const FixedColumnDemo: React.FC = () => {
  // 使用工具函数生成销售数据
  const data = generateSalesData(5);

  // 自定义销售额渲染
  const renderSales = (params: any) => {
    const { val } = params;
    let color = colors.success; // 绿色 - 高销售额
    if (val < 15000) color = colors.warning; // 橙色 - 中等
    if (val < 10000) color = colors.error; // 红色 - 低销售额

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

  const features = [
    '左侧列固定不滚动',
    '水平滚动查看更多数据',
    '多列固定支持',
    '固定列与滚动列样式统一',
    '销售额颜色编码显示',
    '适合展示宽表格数据',
  ];

  // 销售额颜色说明组件
  const legend = (
    <View style={styles.legend}>
      <Text style={styles.legendTitle}>销售额颜色说明：</Text>
      <View style={styles.legendItems}>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorBox, { backgroundColor: colors.success }]}
          />
          <Text style={styles.legendText}>≥15K 优秀</Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.colorBox, { backgroundColor: colors.warning }]}
          />
          <Text style={styles.legendText}>10K-15K 良好</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: colors.error }]} />
          <Text style={styles.legendText}>&lt;10K 待提升</Text>
        </View>
      </View>
    </View>
  );

  return (
    <DemoLayout
      title="固定列表格"
      description="姓名和区域列固定在左侧，左右滑动查看各月销售数据时固定列不会移动"
      features={features}
      scrollable
    >
      <TableContainer data={data} columns={columns} />
      {legend}
    </DemoLayout>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
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
    color: colors.textSecondary,
  },
});

export default FixedColumnDemo;
