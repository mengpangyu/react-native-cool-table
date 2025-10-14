import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import type { ITableColumn } from 'react-native-cool-table';
import DemoLayout from '../components/DemoLayout';
import TableContainer from '../components/TableContainer';
import { generateUserProfiles } from '../utils/dataUtils';
import {
  renderStatusBadge,
  renderActionButtons,
  renderTags,
} from '../utils/renderUtils';
import { colors } from '../styles/commonStyles';

const CustomRenderDemo: React.FC = () => {
  // 使用工具函数生成用户数据
  const data = generateUserProfiles(4);

  // 处理单元格点击
  const handleCellPress = useCallback((params: any) => {
    Alert.alert('单元格点击', `点击了 ${params.col.title}: ${params.val}`, [
      { text: '确定' },
    ]);
  }, []);

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

  // 自定义等级渲染
  const renderLevel = useCallback((params: any) => {
    const { val } = params;
    const levelConfig = {
      SVIP: { color: '#722ed1', bgColor: '#f9f0ff' },
      VIP: { color: colors.warning, bgColor: '#fff7e6' },
      普通: { color: colors.textSecondary, bgColor: '#f5f5f5' },
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

  // 自定义操作按钮渲染
  const renderActions = useCallback((params: any) => {
    const actions = [
      {
        text: '编辑',
        onPress: (row: any) => Alert.alert('编辑', `编辑用户: ${row.name}`),
      },
      {
        text: '删除',
        onPress: (row: any) => Alert.alert('删除', `删除用户: ${row.name}`),
        style: { backgroundColor: colors.error },
      },
    ];
    return renderActionButtons(params, actions);
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
      render: renderStatusBadge,
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

  const features = [
    '头像 + 用户信息组合显示',
    '状态指示器（在线/离线/忙碌）',
    '等级徽章样式',
    '星级评分显示',
    '标签列表（支持省略显示）',
    '操作按钮组',
    '完全自定义单元格内容',
  ];

  return (
    <DemoLayout
      title="自定义渲染表格"
      description="展示各种自定义单元格渲染，包括头像、状态、等级、评分、标签和操作按钮"
      features={features}
    >
      <TableContainer data={data} columns={columns} flex />
    </DemoLayout>
  );
};

const styles = StyleSheet.create({
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
    color: colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textSecondary,
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
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

export default CustomRenderDemo;
