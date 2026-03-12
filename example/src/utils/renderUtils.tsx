import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { ITableColumnParams } from 'react-native-cool-table';
import { colors } from '../styles/commonStyles';

export const renderSalary = ({ val }: ITableColumnParams) => {
  const numVal = val as unknown as number;
  const color =
    numVal >= 20000
      ? colors.success
      : numVal >= 15000
      ? colors.warning
      : colors.error;

  return (
    <View style={styles.salaryContainer}>
      <Text style={[styles.salaryText, { color }]}>
        ¥{numVal?.toLocaleString()}
      </Text>
    </View>
  );
};

export const renderSalaryK = ({ val }: ITableColumnParams) => {
  const numVal = val as unknown as number;
  const color =
    numVal >= 20000
      ? colors.success
      : numVal >= 15000
      ? colors.warning
      : colors.error;

  return (
    <View style={styles.salaryContainer}>
      <Text style={[styles.salaryText, { color }]}>
        ¥{(numVal / 1000).toFixed(0)}K
      </Text>
    </View>
  );
};

export const renderStatusBadge = (
  { val }: ITableColumnParams,
  statusConfig?: Record<string, { color: string; text?: string }>
) => {
  const defaultConfig: Record<string, { color: string; text?: string }> = {
    在职: { color: colors.success },
    试用期: { color: colors.warning },
    离职: { color: colors.error },
    online: { color: colors.success, text: '在线' },
    offline: { color: colors.textLight, text: '离线' },
    busy: { color: colors.warning, text: '忙碌' },
  };

  const config = statusConfig ?? defaultConfig;
  const statusInfo = config[val as string] ?? { color: colors.textLight };

  return (
    <View style={[styles.statusBadge, { backgroundColor: statusInfo.color }]}>
      <Text style={styles.statusText}>
        {statusInfo.text ?? (val as string)}
      </Text>
    </View>
  );
};

export const renderScore = ({ val }: ITableColumnParams) => {
  const numVal = val as unknown as number;
  const color =
    numVal < 60 ? colors.error : numVal < 80 ? colors.warning : colors.success;

  return (
    <View style={styles.scoreContainer}>
      <Text style={[styles.scoreText, { color }]}>{numVal}</Text>
    </View>
  );
};

export const renderProgress = ({ val }: ITableColumnParams) => {
  const numVal = val as unknown as number;
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${numVal}%`,
              backgroundColor: numVal === 100 ? colors.success : colors.primary,
            },
          ]}
        />
      </View>
      <Text style={styles.progressText}>{numVal}%</Text>
    </View>
  );
};

export const renderPriority = (
  { val, row }: ITableColumnParams,
  onPress?: (id: any, priority: string) => void
) => {
  const strVal = val as string;
  const priorityConfig: Record<string, { color: string; text: string }> = {
    high: { color: colors.error, text: '高' },
    medium: { color: colors.warning, text: '中' },
    low: { color: colors.success, text: '低' },
    高: { color: colors.error, text: '高' },
    中: { color: colors.warning, text: '中' },
    低: { color: colors.success, text: '低' },
  };
  const config = priorityConfig[strVal] ?? {
    color: colors.textLight,
    text: strVal,
  };

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
      <TouchableOpacity onPress={() => onPress(row.id, strVal)}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

export const renderActionButtons = (
  { row }: ITableColumnParams,
  actions: Array<{
    text: string;
    onPress: (row: any) => void;
    style?: any;
    textStyle?: any;
  }>
) => (
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

export const renderTags = ({ val }: ITableColumnParams, maxShow = 2) => {
  if (!Array.isArray(val)) return null;
  const tags = val as string[];

  return (
    <View style={styles.tagsContainer}>
      {tags.slice(0, maxShow).map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
      {tags.length > maxShow && (
        <Text style={styles.moreTagsText}>+{tags.length - maxShow}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  salaryContainer: {
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  salaryText: {
    fontSize: 14,
    fontWeight: '600',
  },

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

  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 14,
    fontWeight: '600',
  },

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
