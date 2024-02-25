import { Text } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const Details: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <Text>Details</Text>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(({ color }) => ({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.bg.surface.magic.default,
  },
}));

export { Details };
