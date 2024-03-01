import { Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { OverviewSaveButton } from './OverviewSaveButton';

import { Bill } from '@/assets/icons';
import { useBillingSessionStore } from '@/stores/bill-session';

const Overview: React.FC<unknown> = () => {
  const { styles } = useStyles(stylesheet);
  const total = useBillingSessionStore((state) => state.total);
  const totalBills = useBillingSessionStore((state) => state.bills.length);
  const storeSession = useBillingSessionStore((state) => state.storeSession);

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.icon}>
            <Bill height={28} width={28} />
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>
              Total: <Text style={styles.total}>{total}</Text>
            </Text>
            <Text style={styles.subtitle}>{totalBills} bills scanned</Text>
          </View>
        </View>
        <OverviewSaveButton onPress={storeSession} />
      </View>
    </Animated.View>
  );
};

const stylesheet = createStyleSheet(({ space, text, color }) => ({
  container: {
    height: 168,
    paddingVertical: space['400'],
    paddingHorizontal: space['600'],
    backgroundColor: color.bg.surface.default,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  icon: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: space['300'],
    backgroundColor: color.icon.active,
  },
  info: {
    paddingStart: space['400'],
  },
  title: {
    ...text.body.lg,
    color: color.text.default,
  },
  subtitle: {
    ...text.body.md,
    color: color.text.secondary,
  },
  total: {
    ...text.heading.md,
  },
}));

export { Overview };
