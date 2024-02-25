import { View } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type DividerProps = {
  style?: StyleProp<ViewStyle>;
};

const Divider: React.FC<DividerProps> = ({ style }) => {
  const { styles } = useStyles(stylesheet);

  return <View style={[styles.divider, style]} />;
};

const stylesheet = createStyleSheet(({ color }) => ({
  divider: {
    height: 1,
    backgroundColor: color.border.default,
  },
}));

export { Divider };
