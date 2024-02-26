import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

type OverviewSaveButtonProps = {
  onPress: () => void;
};

const OverviewSaveButton: React.FC<OverviewSaveButtonProps> = ({ onPress }) => {
  const { styles } = useStyles(stylesheet);
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={styles.container(pressed)}>
      <Text style={styles.text}>SAVE</Text>
    </Pressable>
  );
};

const stylesheet = createStyleSheet(({ space, text, color, border }) => ({
  container: (pressed: boolean) => ({
    gap: space.button.group.gap,
    backgroundColor: pressed
      ? color.bg.fill.emphasis.active
      : color.bg.fill.emphasis.default,
    paddingVertical: space['200'],
    paddingHorizontal: space['600'],
    borderRadius: border.radius.full,
  }),
  text: {
    ...text.heading.md,
    color: color.text.magic.onBgFill,
  },
}));

export { OverviewSaveButton };
