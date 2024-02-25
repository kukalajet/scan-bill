import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

const Details: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <Text>Details</Text>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export { Details };
