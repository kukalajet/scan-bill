import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import type { ModalConfig } from './ModalProvider';
import { DEFAULT_HEIGHT, OVERDRAG } from './constants';
import { useModal } from './useModal';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Modal: React.FC<unknown> = () => {
  const { styles, theme } = useStyles(stylesheet);
  const { config, hide } = useModal();
  const height = useMemo(() => getHeight(config?.height), [config]);
  const minHeight = useMemo(() => getHeight(config?.minHeight), [config]);
  const maxOffset = height - minHeight;

  const offset = useSharedValue(maxOffset);
  const [isExpanded, setIsExpanded] = useState(true);

  const overview = config?.overview;
  const details = config?.details;
  const isVisible = Boolean(overview && details);

  const pan = Gesture.Pan()
    .onChange((event) => {
      const offsetDelta = event.changeY + offset.value;
      const clamp = Math.max(-OVERDRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      // A generic solution to handle "steps" in the sheet should be implemented. @kukalajet
      if (offset.value > maxOffset) {
        offset.value = withSpring(maxOffset);
      } else if (offset.value > maxOffset / 2) {
        offset.value = withSpring(maxOffset, {}, () => {
          runOnJS(setIsExpanded)(false);
        });
      } else if (offset.value > maxOffset / 3) {
        offset.value = withTiming(maxOffset / 2, {}, () => {
          runOnJS(setIsExpanded)(true);
        });
      } else {
        offset.value = withSpring(0, {}, () => {
          runOnJS(setIsExpanded)(true);
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      offset.value,
      [0, maxOffset],
      [
        theme.color.bg.fill.transparent.secondary.active,
        theme.color.bg.fill.transparent.full,
      ],
    ),
  }));

  if (!isVisible) return null;

  // WIP
  const toggleSheet = () => {
    if (isVisible) hide();
    offset.value = 0;
  };

  return (
    <>
      <AnimatedPressable
        entering={FadeIn}
        exiting={FadeOut}
        onPress={toggleSheet}
        style={[styles.backdrop, backdropStyle]}
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          entering={SlideInDown.springify().damping(15)}
          exiting={SlideOutDown}
          style={[styles.sheet(height), translateY]}>
          {isExpanded ? details : overview}
        </Animated.View>
      </GestureDetector>
    </>
  );
};

const getHeight = (height: ModalConfig['height']) => {
  if (typeof height === 'number') return height;
  if (typeof height === 'string' && height.endsWith('%')) {
    const screenHeight = Dimensions.get('window').height;
    return (screenHeight / 100) * Number(height.replace('%', ''));
  }

  return DEFAULT_HEIGHT;
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
    zIndex: 1,
  },
}));

export { Modal };
