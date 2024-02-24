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
            content: <Text style={styles.title}>Test Modal1</Text>,
            height: '25%',
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
