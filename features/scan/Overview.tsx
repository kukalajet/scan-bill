import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { useBillingSessionStore } from '@/stores/bill-session';

const Overview: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const total = useBillingSessionStore((state) => state.total);
  const totalBills = useBillingSessionStore((state) => state.bills.length);

  return (
    <View style={styles.container}>
      <Text>Total bill: ${total}</Text>
      <Text>Total bills: {totalBills}</Text>
    </View>
  );
};

const stylesheet = createStyleSheet(({ space, color }) => ({
  container: {
    height: 196,
    width: '100%',
    padding: space['400'],
    backgroundColor: color.bg.surface.default,
  },
}));

export { Overview };
