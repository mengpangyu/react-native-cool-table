import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/commonStyles';

// 薪资渲染
export const renderSalary = (params: any) => {
  const { val } = params;
  const color =
    val >= 20000
      ? colors.error
      : val >= 15000
      ? colors.warning
      : colors.success;

  return (
    <View style={styles.salaryContainer}>
      <Text style={[styles.salaryText, { color }]}>
        ¥{val?.toLocaleString()}
      </Text>
    </View>
  );
};

// 简化薪资渲染（K格式）
export const renderSalaryK = (params: any) => {
  const { val } = params;
  const color =
    val >= 20000
      ? colors.success
      : val >= 15000
      ? colors.warning
      : colors.error;

  return (
    <View style={styles.salaryContainer}>
      <Text style={[styles.salaryText, { color }]}>
        ¥{(val / 1000).toFixed(0)}K
      </Text>
    </View>
  );
};

// 状态徽章渲染
export const renderStatusBadge = (
  params: any,
  statusConfig?: Record<string, { color: string; text?: string }>
) => {
  const { val } = params;
  const defaultConfig = {
    在职: { color: colors.success },
    试用期: { color: colors.warning },
    离职: { color: colors.error },
    online: { color: colors.success, text: '在线' },
    offline: { color: colors.textLight, text: '离线' },
    busy: { color: colors.warning, text: '忙碌' },
  };

  const config: any = statusConfig || defaultConfig;
  const statusInfo = config[val] || { color: colors.textLight };

  return (
    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
      <Text style={styles.statusText}>{statusInfo.text || val}</Text>
    </View>
  );
};

// 分数渲染（带颜色）
export const renderScore = (params: any) => {
  const { val } = params;
  let color = colors.success; // 优秀
  if (val < 60) color = colors.error; // 不及格
  else if (val < 80) color = colors.warning; // 良好

  return (
    <View style={styles.scoreContainer}>
      <Text style={[styles.scoreText, { color }]}>{val}</Text>
    </View>
  );
};

// 进度条渲染
export const renderProgress = (params: any) => {
  const { val } = params;
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${val}%`,
              backgroundColor: val === 100 ? colors.success : colors.primary,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{val}%</Text>
    </View>
  );
};

// 优先级渲染
export const renderPriority = (
  params: any,
  onPress?: (id: any, priority: string) => void
) => {
  const { val, row } = params;
  const priorityConfig = {
    high: { color: colors.error, text: '高' },
    medium: { color: colors.warning, text: '中' },
    low: { color: colors.success, text: '低' },
    高: { color: colors.error, text: '高' },
    中: { color: colors.warning, text: '中' },
    低: { color: colors.success, text: '低' },
  };
  const config = priorityConfig[val as keyof typeof priorityConfig];

  const content = (
    <View style={styles.priorityContainer}>
      <View style={[styles.priorityDot, { backgroundColor: config.color }]} />
      <Text style={[styles.priorityText, { color: config.color }]}>
        {config.text}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={() => onPress(row.id, val)}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

// 操作按钮组渲染
export const renderActionButtons = (
  params: any,
  actions: Array<{
    text: string;
    onPress: (row: any) => void;
    style?: any;
    textStyle?: any;
  }>
) => {
  const { row } = params;

  return (
    <View style={styles.actionsContainer}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.actionButton, action.style]}
          onPress={() => action.onPress(row)}
        >
          <Text style={[styles.actionButtonText, action.textStyle]}>
            {action.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// 标签列表渲染
export const renderTags = (params: any, maxShow = 2) => {
  const { val } = params;
  if (!Array.isArray(val)) return null;

  return (
    <View style={styles.tagsContainer}>
      {val.slice(0, maxShow).map((tag: string, index: number) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
      {val.length > maxShow && (
        <Text style={styles.moreTagsText}>+{val.length - maxShow}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // 薪资样式
  salaryContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  salaryText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // 状态徽章样式
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
  },
  statusText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '500',
  },

  // 分数样式
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
  },

  // 进度条样式
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
    color: colors.textSecondary,
    fontWeight: '500',
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

  // 操作按钮样式
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  actionButtonText: {
    fontSize: 11,
    color: colors.white,
    fontWeight: '500',
  },

  // 标签样式
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
    color: colors.primary,
    fontWeight: '500',
  },
  moreTagsText: {
    fontSize: 10,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});
