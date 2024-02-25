import { router } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

import { FloatingActionButton } from '@/components/floating-action-button';

export default function TabOneScreen() {
  return (
    <>
      <FloatingActionButton onPress={() => router.navigate('scan')} />
      <View style={styles.container}>
        <Text onPress={() => router.navigate('scan')} style={styles.title}>
          Tab One
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
