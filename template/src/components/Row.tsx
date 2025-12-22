import { scaler } from '@/utils/helpers';
import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export interface RowProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  gap?: number;
  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
}

export const Row: FC<RowProps> = ({
  children,
  style,
  gap,
  justify,
  align = 'center', // Default as requested
}) => {
  return (
    <View
      style={[
        styles.row,
        {
          alignItems: align,
          justifyContent: justify,
          gap: gap ? scaler(gap) : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
