'use strict';

import React, { memo } from 'react';
import { View, Image, Text } from 'react-native';
import { IEmptyProps } from '../../types';
import { EMPTY_IMAGE } from '../../constant';
import styles from './styles';

const Empty = ({
  image,
  style,
  imageStyle,
  description,
  textStyle,
}: IEmptyProps) => {
  return (
    <View style={[styles.container, style]}>
      <Image
        source={image || EMPTY_IMAGE}
        style={[styles.imageStyle, imageStyle, imageStyle]}
      />
      <Text style={[styles.textStyle, textStyle]}>{description}</Text>
    </View>
  );
};

export default memo(Empty);
