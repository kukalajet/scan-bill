import { Text, View, Button } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

export default function TabTwoScreen() {
  const { styles } = useStyles(stylesheet);
  const width = useSharedValue(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
}

const stylesheet = createStyleSheet(({ color }) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.bg.surface.active,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
}));
