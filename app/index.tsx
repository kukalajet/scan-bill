import { router } from 'expo-router';
import { Text } from 'react-native';

import { FloatingActionButton } from '@/components/floating-action-button';

const Home: React.FC<unknown> = () => {
  return (
    <>
      <FloatingActionButton onPress={() => router.navigate('scan')} />
      <Text>HOME!</Text>
    </>
  );
};

export default Home;
