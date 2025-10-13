import React, { memo, useMemo } from 'react';
import { View, Image } from 'react-native';
import { IIconProps } from '../../types';
import { ICON_MAP } from 'src/constant';

const Icon = ({ type, style, imageStyle, source }: IIconProps) => {
  const iconInfo = useMemo(() => {
    return ICON_MAP[type] ?? { source, style: imageStyle };
  }, [type, source, imageStyle]);
  return (
    <View style={style}>
      <Image style={iconInfo.style} source={iconInfo.source} />
    </View>
  );
};

export default memo(Icon);
