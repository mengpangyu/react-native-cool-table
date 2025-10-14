import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CoolTable, { ITableColumn } from 'react-native-cool-table';

const ExpandableTableDemo: React.FC = () => {
  // 部门数据（带子部门）
  const data = [
    {
      id: 1,
      department: '技术部',
      manager: '张经理',
      employees: 25,
      budget: 500000,
      children: [
        {
          id: '1-1',
          name: '前端组',
          leader: '李组长',
          members: 8,
          projects: ['官网重构', 'APP开发'],
        },
        {
          id: '1-2',
          name: '后端组',
          leader: '王组长',
          members: 12,
          projects: ['API优化', '数据库升级'],
        },
        {
          id: '1-3',
          name: '测试组',
          leader: '赵组长',
          members: 5,
          projects: ['自动化测试', '性能测试'],
        },
      ],
    },
    {
      id: 2,
      department: '产品部',
      manager: '刘经理',
      employees: 15,
      budget: 300000,
      children: [
        {
          id: '2-1',
          name: '产品策划',
          leader: '陈组长',
          members: 6,
          projects: ['需求分析', '产品规划'],
        },
        {
          id: '2-2',
          name: '用户研究',
          leader: '孙组长',
          members: 4,
          projects: ['用户调研', '数据分析'],
        },
        {
          id: '2-3',
          name: '产品运营',
          leader: '周组长',
          members: 5,
          projects: ['活动策划', '用户增长'],
        },
      ],
    },
    {
      id: 3,
      department: '设计部',
      manager: '吴经理',
      employees: 12,
      budget: 200000,
      children: [
        {
          id: '3-1',
          name: 'UI设计',
          leader: '郑组长',
          members: 7,
          projects: ['界面设计', '交互设计'],
        },
        {
          id: '3-2',
          name: '视觉设计',
          leader: '钱组长',
          members: 5,
          projects: ['品牌设计', '宣传物料'],
        },
      ],
    },
    {
      id: 4,
      department: '市场部',
      manager: '何经理',
      employees: 18,
      budget: 400000,
      children: [],
    },
  ];

  // 自定义预算渲染
  const renderBudget = useCallback((params: any) => {
    const { val } = params;
    return (
      <View style={styles.budgetContainer}>
        <Text style={styles.budgetText}>¥{val?.toLocaleString()}</Text>
      </View>
    );
  }, []);

  // 自定义展开内容渲染
  const renderExpandContent = useCallback(
    ({ data: expandData, parentData }: any) => {
      if (!expandData || expandData.length === 0) {
        return (
          <View style={styles.emptyExpand}>
            <Text style={styles.emptyExpandText}>该部门暂无下级组织</Text>
          </View>
        );
      }

      return (
        <View style={styles.expandContainer}>
          <Text style={styles.expandTitle}>
            {parentData.department} - 下级组织 ({expandData.length}个)
          </Text>
          {expandData.map((group: any) => (
            <View key={group.id} style={styles.groupItem}>
              <View style={styles.groupHeader}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupMembers}>{group.members}人</Text>
              </View>
              <Text style={styles.groupLeader}>负责人: {group.leader}</Text>
              <View style={styles.projectsContainer}>
                <Text style={styles.projectsLabel}>项目:</Text>
                <View style={styles.projectsList}>
                  {group.projects.map((project: string, idx: number) => (
                    <View key={idx} style={styles.projectTag}>
                      <Text style={styles.projectText}>{project}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </View>
      );
    },
    []
  );

  // 列配置
  const columns: ITableColumn[] = [
    {
      key: 'department',
      title: '部门名称',
      width: 100,
      align: 'left',
      textStyle: { fontWeight: 'bold' },
    },
    {
      key: 'manager',
      title: '负责人',
      width: 80,
      align: 'center',
    },
    {
      key: 'employees',
      title: '人数',
      width: 60,
      align: 'center',
    },
    {
      key: 'budget',
      title: '预算',
      width: 120,
      align: 'right',
      render: renderBudget,
    },
  ];

  // 树形配置
  const treeConfig = {
    autoCollapseOthers: false, // 允许同时展开多个
    animationDuration: 300,
    renderExpand: renderExpandContent,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>可展开表格</Text>
        <Text style={styles.description}>
          点击有子数据的行可以展开查看详细信息，支持树形结构展示
        </Text>
      </View>

      <View style={styles.tableContainer}>
        <CoolTable
          data={data}
          columns={columns}
          treeConfig={treeConfig}
          style={styles.table}
          rowStyle={styles.row}
          headerRowStyle={styles.headerRow}
        />
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>功能特点：</Text>
        <Text style={styles.featureItem}>• 树形数据结构展示</Text>
        <Text style={styles.featureItem}>• 点击展开/收起子内容</Text>
        <Text style={styles.featureItem}>• 自定义展开内容渲染</Text>
        <Text style={styles.featureItem}>• 支持多层级嵌套</Text>
        <Text style={styles.featureItem}>• 展开动画效果</Text>
        <Text style={styles.featureItem}>• 可配置是否自动折叠其他项</Text>
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
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
  },
  budgetContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  budgetText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#52c41a',
  },
  expandContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  expandTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  groupItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#1890ff',
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  groupName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  groupMembers: {
    fontSize: 13,
    color: '#1890ff',
    fontWeight: '500',
  },
  groupLeader: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  projectsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  projectsLabel: {
    fontSize: 13,
    color: '#666',
    marginRight: 8,
    marginTop: 2,
  },
  projectsList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  projectTag: {
    backgroundColor: '#e6f7ff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 4,
  },
  projectText: {
    fontSize: 12,
    color: '#1890ff',
  },
  emptyExpand: {
    padding: 20,
    alignItems: 'center',
  },
  emptyExpandText: {
    color: '#999',
    fontSize: 14,
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

export default ExpandableTableDemo;
