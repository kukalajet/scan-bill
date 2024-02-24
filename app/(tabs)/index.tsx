import { router } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';

import { useModal } from '@/components/modal';

export default function TabOneScreen() {
  const { show } = useModal();

  return (
    <View style={styles.container}>
      <Text
        onPress={() =>
          // router.navigate('scan')
          show({
            overview: <Text style={styles.title}>Overview</Text>,
            details: <Text style={styles.title}>Details</Text>,
            height: '80%',
            minHeight: 196,
          })
        }
        style={styles.title}>
        Tab One
      </Text>
    </View>
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
