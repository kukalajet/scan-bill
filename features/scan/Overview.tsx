import { Text, View } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Bill } from '@/assets/icons';
import { useBillingSessionStore } from '@/stores/bill-session';

const Overview: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const total = useBillingSessionStore((state) => state.total);
  const totalBills = useBillingSessionStore((state) => state.bills.length);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.icon}>
            <Bill height={32} width={32} />
          </View>
          <View style={{ paddingStart: 8 }}>
            <Text>Total bill: {total}</Text>
            <Text>Total bills: {totalBills}</Text>
          </View>
        </View>
        <View />
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(({ space, color }) => ({
  container: {
    height: 196,
    padding: space['200'],
    backgroundColor: color.bg.surface.default,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    padding: space['400'],
    borderRadius: space['300'],
    backgroundColor: color.icon.active,
  },
}));

export { Overview };
