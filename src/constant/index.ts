import type { FlexAlignType, ImageStyle, StyleProp } from 'react-native';

export const ALIGN_MAP: Record<string, FlexAlignType> = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
};

export const SORT_STATUS_MAP = {
  // 正序
  asc: 'asc',
  // 倒序
  desc: 'desc',
} as const;

export const EMPTY_IMAGE = require('../assets/empty.png');

export const ICON_MAP: Record<
  string,
  { source: { uri: string }; style: StyleProp<ImageStyle> }
> = {
  sortDesc: { source: require('../assets/404.png'), style: {} },
  sortAsc: { source: require('../assets/404.png'), style: {} },
  expand: { source: require('../assets/404.png'), style: {} },
} as const;
