import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type DetailsSaveButtonProps = {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

const DetailsSaveButton: React.FC<DetailsSaveButtonProps> = ({
  onPress,
  style,
}) => {
  const { styles } = useStyles(stylesheet);
  const [pressed, setPressed] = useState(false);

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      entering={FadeInDown}
      exiting={FadeOutUp}
      style={[styles.container(pressed), style]}>
      <Text style={styles.text}>SAVE SCANNED BILLS</Text>
    </AnimatedPressable>
  );
};

const stylesheet = createStyleSheet(({ space, text, color, border }) => ({
  container: (pressed: boolean) => ({
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: space.button.group.gap,
    backgroundColor: pressed
      ? color.bg.fill.emphasis.active
      : color.bg.fill.emphasis.default,
    borderTopStartRadius: border.radius['400'],
    borderTopEndRadius: border.radius['400'],
    paddingVertical: space[500],
  }),
  text: {
    ...text.heading.md,
    color: color.text.magic.onBgFill,
  },
}));

export { DetailsSaveButton };
