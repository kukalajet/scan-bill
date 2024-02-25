import { View, Text } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';

import { Trash } from '@/assets/icons';
import { useBillingSessionStore } from '@/stores/bill-session';
import {
  convertISO8601StringToFormattedDate,
  formatToLekCurrency,
} from '@/utils/format';

type BillListItemProps = { bill: Bill; index: number };

const BillListItem: React.FC<BillListItemProps> = ({ bill, index }) => {
  const { styles, theme } = useStyles(stylesheet);
  const deleteBill = useBillingSessionStore((state) => state.deleteBill);

  const date = convertISO8601StringToFormattedDate(bill.crtd);
  const price = formatToLekCurrency(Number(bill.prc));

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.icon}>
          <Text style={styles.index}>#{index + 1}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>
            Bill: <Text style={styles.total}>{price}</Text>
          </Text>
          <Text style={styles.subtitle}>{date}</Text>
        </View>
      </View>
      <Trash
        width={24}
        height={24}
        color={theme.color.icon.critical}
        onPress={() => deleteBill(bill)}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(({ color, space, text }) => ({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: space['400'],
    paddingHorizontal: space['600'],
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: { paddingStart: space['400'] },
  icon: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: space['300'],
    backgroundColor: color.bg.fill.magic.secondary.active,
  },
  index: { color: color.text.magic.secondary, ...text.heading.md },
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

export { BillListItem };
