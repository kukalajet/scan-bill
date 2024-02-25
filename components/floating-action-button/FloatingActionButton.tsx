import { FC, useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Scan } from '@/assets/icons';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DURATION = 1500;
const EASING = Easing.bezier(0.25, -0.5, 0.25, 1);

type FloatingActionButtonProps = {
  onPress: () => void;
};

const FloatingActionButton: FC<FloatingActionButtonProps> = ({ onPress }) => {
  const { styles, theme } = useStyles(stylesheet);

  const sv = useSharedValue(0);

  useEffect(() => {
    sv.value = withDelay(
      500,
      withTiming(1, { duration: DURATION, easing: EASING }),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sv.value * 360}deg` }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: theme.color.bg.fill.magic.default,
          shadowColor: theme.color.input.border.active,
        },
        animatedStyle,
      ]}>
      <Scan width={24} height={24} />
    </AnimatedPressable>
  );
};

const stylesheet = createStyleSheet(({ height, width, space, border }) => ({
  container: {
    width: width[1600],
    height: height[1600],
    zIndex: 2,
    flex: 1,
    right: space[600],
    bottom: space[800],
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: border.radius.full,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1 / 3,
    shadowRadius: 4,
    elevation: 2,
  },
}));

export { FloatingActionButton };
