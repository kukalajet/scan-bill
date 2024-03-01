import { router } from 'expo-router';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { FloatingActionButton } from '@/components/floating-action-button';
import * as storage from '@/storages';
import { useBillingSessionsStore } from '@/stores/bill-sessions';

const HomeScreen: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const loadSessions = useBillingSessionsStore((state) => state.loadSessions);
  const sessions = useBillingSessionsStore((state) => state.sessions);

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <>
      <FloatingActionButton onPress={() => router.navigate('scan')} />
      <View style={styles.container}>
        <Text onPress={() => storage.reset()}>HOME!</Text>
        <Text>{JSON.stringify(sessions)}</Text>
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
