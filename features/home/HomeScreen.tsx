import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FloatingActionButton } from '@/components/floating-action-button';

const HomeScreen: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);

  return (
    <>
      <FloatingActionButton onPress={() => router.navigate('scan')} />
      <View style={styles.container}>
        <Text>HOME!</Text>
      </View>
    </>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export { HomeScreen };
