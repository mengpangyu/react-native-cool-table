import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  // 容器样式
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // 头部样式
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
  },
  tableContainerFlex: {
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

  // 表格样式
  table: {
    backgroundColor: '#fff',
  },
  row: {
    minHeight: 48,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowLarge: {
    minHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  rowSmall: {
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerRow: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 2,
    borderBottomColor: '#e8e8e8',
  },

  // 功能说明样式
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

  // 信息提示样式
  sortInfo: {
    fontSize: 12,
    color: '#1890ff',
    fontStyle: 'italic',
    marginTop: 8,
  },

  // 空状态样式
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
  },
});

// 常用颜色
export const colors = {
  primary: '#1890ff',
  success: '#52c41a',
  warning: '#fa8c16',
  error: '#ff4d4f',
  text: '#333',
  textSecondary: '#666',
  textLight: '#999',
  border: '#e8e8e8',
  background: '#f5f5f5',
  white: '#fff',
};
