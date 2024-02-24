import { useMemo, type FC } from 'react';
import { Pressable, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useModal } from './useModal';

const OVERDRAG = 20;
const DEFAULT_HEIGHT = 256;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Modal: FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const { config, hide } = useModal();

  const offset = useSharedValue(0);
  const height = useMemo(() => {
    if (typeof config?.height === 'number') {
      return config.height;
    }

    if (typeof config?.height === 'string' && config.height.endsWith('%')) {
      const screenHeight = Dimensions.get('window').height;
      return (screenHeight / 100) * Number(config.height.replace('%', ''));
    }

    return DEFAULT_HEIGHT;
  }, [config?.height]);

  const content = config?.content;
  const isVisible = Boolean(content);

  const toggleSheet = () => {
    if (isVisible) hide();
    offset.value = 0;
  };

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;

      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < height / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(height, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  if (!isVisible) return null;

  return (
    <>
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        onPress={toggleSheet}
        style={styles.backdrop}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
          style={[styles.sheet(height), translateY]}>
          {content}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const stylesheet = createStyleSheet(({ color }) => ({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  sheet: (height: `${number}%` | number) => ({
    backgroundColor: color.bg.surface.default,
    padding: 16,
    height,
    width: '100%',
    position: 'absolute',
    bottom: -OVERDRAG * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  }),
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.bg.fill.default,
    zIndex: 1,
  },
}));

export { Modal };
