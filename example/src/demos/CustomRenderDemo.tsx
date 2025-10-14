import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CoolTable, { ITableColumn } from 'react-native-cool-table';

const CustomRenderDemo: React.FC = () => {
  // 用户数据
  const data = [
    {
      id: 1,
      avatar: 'https://i.pravatar.cc/100?img=1',
      name: '张三',
      email: 'zhangsan@example.com',
      status: 'online',
      level: 'VIP',
      score: 4.8,
      tags: ['前端', 'React', 'TypeScript'],
      joinDate: '2023-01-15',
      lastLogin: '2024-10-14 09:30',
    },
    {
      id: 2,
      avatar: 'https://i.pravatar.cc/100?img=2',
      name: '李四',
      email: 'lisi@example.com',
      status: 'offline',
      level: '普通',
      score: 4.2,
      tags: ['后端', 'Node.js', 'Python'],
      joinDate: '2023-03-20',
      lastLogin: '2024-10-13 18:45',
    },
    {
      id: 3,
      avatar: 'https://i.pravatar.cc/100?img=3',
      name: '王五',
      email: 'wangwu@example.com',
      status: 'busy',
      level: 'SVIP',
      score: 4.9,
      tags: ['设计', 'UI/UX', 'Figma'],
      joinDate: '2022-11-08',
      lastLogin: '2024-10-14 10:15',
    },
    {
      id: 4,
      avatar: 'https://i.pravatar.cc/100?img=4',
      name: '赵六',
      email: 'zhaoliu@example.com',
      status: 'online',
      level: 'VIP',
      score: 4.5,
      tags: ['产品', '需求分析'],
      joinDate: '2023-07-12',
      lastLogin: '2024-10-14 08:20',
    },
  ];

  // 自定义头像渲染
  const renderAvatar = useCallback((params: any) => {
    const { row } = params;
    return (
      <View style={styles.avatarContainer}>
        <Image source={{ uri: row.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{row.name}</Text>
          <Text style={styles.userEmail}>{row.email}</Text>
        </View>
      </View>
    );
  }, []);

  // 自定义状态渲染
  const renderStatus = useCallback((params: any) => {
    const { val } = params;
    console.log('val', val);
    const statusConfig = {
      online: { color: '#52c41a', text: '在线', dot: true },
      offline: { color: '#d9d9d9', text: '离线', dot: true },
      busy: { color: '#fa8c16', text: '忙碌', dot: true },
    };
    const config = statusConfig[val as keyof typeof statusConfig];

    return (
      <View style={styles.statusContainer}>
        {config?.dot && (
          <View style={[styles.statusDot, { backgroundColor: config.color }]} />
        )}
        <Text style={[styles.statusText, { color: config?.color }]}>
          {config?.text}
        </Text>
      </View>
    );
  }, []);

  // 自定义等级渲染
  const renderLevel = useCallback((params: any) => {
    const { val } = params;
    const levelConfig = {
      SVIP: { color: '#722ed1', bgColor: '#f9f0ff' },
      VIP: { color: '#fa8c16', bgColor: '#fff7e6' },
      普通: { color: '#666', bgColor: '#f5f5f5' },
    };
    const config =
      levelConfig[val as keyof typeof levelConfig] || levelConfig['普通'];

    return (
      <View style={[styles.levelBadge, { backgroundColor: config.bgColor }]}>
        <Text style={[styles.levelText, { color: config.color }]}>{val}</Text>
      </View>
    );
  }, []);

  // 自定义评分渲染
  const renderScore = useCallback((params: any) => {
    const { val } = params;
    const stars = Math.floor(val);
    const hasHalfStar = val % 1 !== 0;

    return (
      <View style={styles.scoreContainer}>
        <View style={styles.starsContainer}>
          {[...Array(5)].map((_, index) => (
            <Text
              key={index}
              style={[
                styles.star,
                {
                  color:
                    index < stars
                      ? '#fadb14'
                      : index === stars && hasHalfStar
                      ? '#fadb14'
                      : '#d9d9d9',
                },
              ]}
            >
              ★
            </Text>
          ))}
        </View>
        <Text style={styles.scoreText}>{val}</Text>
      </View>
    );
  }, []);

  // 自定义标签渲染
  const renderTags = useCallback((params: any) => {
    const { val } = params;
    if (!Array.isArray(val)) return null;

    return (
      <View style={styles.tagsContainer}>
        {val.slice(0, 2).map((tag: string, index: number) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {val.length > 2 && (
          <Text style={styles.moreTagsText}>+{val.length - 2}</Text>
        )}
      </View>
    );
  }, []);

  // 自定义操作按钮渲染
  const renderActions = useCallback(() => {
    return (
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>编辑</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
            删除
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  // 列配置
  const columns: ITableColumn[] = [
    {
      key: 'avatar',
      title: '用户信息',
      width: 200,
      align: 'left',
      render: renderAvatar,
    },
    {
      key: 'status',
      title: '状态',
      width: 80,
      align: 'center',
      render: renderStatus,
    },
    {
      key: 'level',
      title: '等级',
      width: 80,
      align: 'center',
      render: renderLevel,
    },
    {
      key: 'score',
      title: '评分',
      width: 100,
      align: 'center',
      render: renderScore,
    },
    {
      key: 'tags',
      title: '标签',
      width: 120,
      align: 'left',
      render: renderTags,
    },
    {
      key: 'joinDate',
      title: '加入时间',
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
        <Text style={styles.title}>自定义渲染表格</Text>
        <Text style={styles.description}>
          展示各种自定义单元格渲染，包括头像、状态、等级、评分、标签和操作按钮
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
        <Text style={styles.featuresTitle}>自定义渲染特性：</Text>
        <Text style={styles.featureItem}>• 头像 + 用户信息组合显示</Text>
        <Text style={styles.featureItem}>• 状态指示器（在线/离线/忙碌）</Text>
        <Text style={styles.featureItem}>• 等级徽章样式</Text>
        <Text style={styles.featureItem}>• 星级评分显示</Text>
        <Text style={styles.featureItem}>• 标签列表（支持省略显示）</Text>
        <Text style={styles.featureItem}>• 操作按钮组</Text>
        <Text style={styles.featureItem}>• 完全自定义单元格内容</Text>
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
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
  },
  // 头像相关样式
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#666',
  },
  // 状态相关样式
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  // 等级相关样式
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  levelText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  // 评分相关样式
  scoreContainer: {
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  star: {
    fontSize: 12,
    marginHorizontal: 1,
  },
  scoreText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  // 标签相关样式
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 8,
  },
  tag: {
    backgroundColor: '#e6f7ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 10,
    color: '#1890ff',
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
  // 操作按钮相关样式
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
  },
  actionButtonText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  deleteButtonText: {
    color: '#fff',
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

export default CustomRenderDemo;
