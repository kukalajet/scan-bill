import { router } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native';

import { SessionBillList } from './SessionBillList';

import { FloatingActionButton } from '@/components/floating-action-button';
import { useBillingSessionsStore } from '@/stores/bill-sessions';

const HomeScreen: React.FC<unknown> = () => {
  const loadSessions = useBillingSessionsStore((state) => state.loadSessions);

  useEffect(() => {
    loadSessions();
  }, []);

  return (
    <>
      <FloatingActionButton onPress={() => router.navigate('scan')} />
      <SafeAreaView>
        <SessionBillList />
      </SafeAreaView>
    </>
  );
};

export { HomeScreen };
